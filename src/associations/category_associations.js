const Product = require('../models/product_model');
const Category = require('../models/category_model');

Product.belongsTo(Category, { foreignKey: 'categoria_id', as: 'category' });
Category.hasMany(Product, { foreignKey: 'categoria_id', as: 'products' });
