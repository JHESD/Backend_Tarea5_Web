const { DataTypes } = require('sequelize');
const sequelize = require('../db/db_confing');
const Business = require('./business_model');
const Category = require('./category_model');

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id_producto'
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false ,
        field: 'producto_name'
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'producto_description'
    },
    precio: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        field: 'producto_precio'
    },
    img_Url: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'producto_img_url'
    },
    categoria_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'categoria_id',
        references: {
            model: 'categoria',
            key: 'id_categoria'
        }
    },
    negocio_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'negocio',
            key: 'id_negocio'
        }
    }
}, {
    tableName: 'producto',
    timestamps: false,
});

Product.belongsTo(Business, { foreignKey: 'negocio_id' });
Business.hasMany(Product, { foreignKey: 'negocio_id' });

Product.belongsTo(Category, { foreignKey: 'categoria_id' });

module.exports = Product;
