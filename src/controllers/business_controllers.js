const Business = require('../models/business_model');
const User = require('../models/user_model');

exports.createBusiness = async (req, res) => {
    try {
        const { name, direccion, userId } = req.body;

        const user = await User.findByPk(userId);
        if (!user || !user.isAdmin) {
            return res.status(403).json({ error: "Usuario no autorizado o no es administrador" });
        }

        const newBusiness = await Business.create({
            name,
            direccion,
            id_usuario: userId
        });

        res.status(201).json(newBusiness);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener todos los negocios A
exports.getAllBusinesses = async (req, res) => {
    try {
        const businesses = await Business.findAll({
            include: {
                model: User,
                attributes: ['user', 'email', 'isAdmin']
            }
        });
        res.status(200).json(businesses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getBusinessById = async (req, res) => {
    try {
        const { id } = req.params;
        const business = await Business.findByPk(id, {
            include: {
                model: User,
                attributes: ['user', 'email', 'isAdmin']
            }
        });

        if (!business) {
            return res.status(404).json({ error: "Negocio no encontrado" });
        }

        res.status(200).json(business);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateBusiness = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, direccion } = req.body;

        const business = await Business.findByPk(id);
        if (!business) {
            return res.status(404).json({ error: "Negocio no encontrado" });
        }

        business.name = name || business.name;
        business.direccion = direccion || business.direccion;
        await business.save();

        res.status(200).json(business);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteBusiness = async (req, res) => {
    try {
        const { id } = req.params;

        const business = await Business.findByPk(id);
        if (!business) {
            return res.status(404).json({ error: "Negocio no encontrado" });
        }

        const user = await User.findByPk(business.id_usuario);
        if (user && user.isAdmin) {
            user.isAdmin = false;
            await user.save();
        }

        await business.destroy();
        res.status(200).json({ message: "Negocio eliminado exitosamente y rol de usuario actualizado." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
