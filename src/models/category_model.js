const { DataTypes } = require('sequelize');
const sequelize = require('../db/db_confing');
const Product = require('./product_model');

const Category = sequelize.define('Category', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id_categoria'
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'name'
    }
}, {
    tableName: 'categoria',
    timestamps: false,
});

 require('../associations/category_associations');
 
sequelize.sync();

module.exports = Category;
