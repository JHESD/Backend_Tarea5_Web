const { Op } = require('sequelize');
const Product = require('../models/product_model');
const Business = require('../models/business_model');
const Category = require('../models/category_model');

exports.createProduct = async (req, res) => {
    try {
        const { name, description, precio, img_Url, negocio_id, categoria_id } = req.body;
        
        const businessExists = await Business.findByPk(negocio_id);
        const categoryExists = await Category.findByPk(categoria_id);
        
        if (!businessExists) {
            return res.status(404).json({ error: "Negocio no encontrado" });
        }
        if (!categoryExists) {
            return res.status(404).json({ error: "Categoría no encontrada" });
        }
        
        const newProduct = await Product.create({
            name,
            description,
            precio,
            img_Url,
            negocio_id,
            categoria_id
        });        
        
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.findAll({
            include: [Business, Category]
        });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getProductsByBusiness = async (req, res) => {
    try {
        const { id_negocio } = req.params;
        const products = await Product.findAll({
            where: { negocio_id: id_negocio },
            include: [Business, Category]
        });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getProductsByCategories = async (req, res) => {
    const { categories } = req.query;
    const categoryArray = categories.split(',');

    try {
        const products = await Product.findAll({
            where: {
                categoria_id: {
                    [Op.in]: categoryArray
                }
            },
            include: [                 
                {
                    model: Business,
                    attributes: ['name'],
                },
                {
                    model: Category,
                    attributes: ['name'],
                } 
            ]
        });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, precio, img_Url, id_negocio, id_categoria } = req.body;
        
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }
        
        await product.update({
            name,
            description,
            precio,
            img_Url,
            id_negocio,
            id_categoria
        });
        
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }
        
        await product.destroy();
        res.status(200).json({ message: "Producto eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
