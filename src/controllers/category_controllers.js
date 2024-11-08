const Category = require('../models/category_model');
const Product = require('../models/product_model');

exports.createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ error: 'El nombre de la categoría es requerido' });
        }

        const newCategory = await Category.create({ name });
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la categoría', details: error.message });
    }
};

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll({
            include: { model: Product, as: 'products' }
        });
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las categorías', details: error.message });
    }
};

exports.getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findByPk(id, {
            include: { model: Product, as: 'products' }
        });

        if (!category) {
            return res.status(404).json({ error: 'Categoría no encontrada' });
        }

        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la categoría', details: error.message });
    }
};

exports.updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const category = await Category.findByPk(id);
        if (!category) {
            return res.status(404).json({ error: 'Categoría no encontrada' });
        }

        category.name = name || category.name;
        await category.save();

        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la categoría', details: error.message });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await Category.findByPk(id);
        if (!category) {
            return res.status(404).json({ error: 'Categoría no encontrada' });
        }

        await category.destroy();
        res.status(200).json({ message: 'Categoría eliminada exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la categoría', details: error.message });
    }
};
