const User = require('../models/user_model');
const Business = require('../models/business_model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {
    const { user, email, password, name, lastname, nit, isAdmin } = req.body;

    try {
        const existingUser = await User.findOne({ where: { user } });
        const existingEmail = await User.findOne({ where: { email } });

        if (existingUser) {
            return res.status(400).json({ error: "Nombre de usuario ya registrado" });
        }
        if (existingEmail) {
            return res.status(400).json({ error: "Email ya registrado" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            user,
            email,
            password: hashedPassword,
            name,
            lastname,
            nit,
            isAdmin: isAdmin || false
        });

        res.status(201).json({ message: "Usuario creado exitosamente", user: newUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createAdmin = async (req, res) => {
    const { user, email, password, name, lastname, nit, businessName, businessAddress } = req.body;

    try {
        const existingUser = await User.findOne({ where: { user } });
        const existingEmail = await User.findOne({ where: { email } });

        if (existingUser) {
            return res.status(400).json({ error: "Nombre de usuario ya registrado" });
        }
        if (existingEmail) {
            return res.status(400).json({ error: "Email ya registrado" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newAdmin = await User.create({
            user,
            email,
            password: hashedPassword,
            name,
            lastname,
            nit,
            isAdmin: true
        });

        const newBusiness = await Business.create({
            name: businessName,
            direccion: businessAddress,
            usuario_id: newAdmin.id
        });

        res.status(201).json({ message: "Administrador y negocio creados exitosamente", admin: newAdmin, business: newBusiness });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Credenciales incorrectas" });
        }

        const token = jwt.sign({ userId: user.id, isAdmin: user.isAdmin }, process.env.SECRET_KEY, {
            expiresIn: '1h'
        });

        res.status(200).json({ message: "Inicio de sesión exitoso", token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

