const { DataTypes } = require('sequelize');
const sequelize = require('../db/db_confing');
const User = require('./user_model');

const Business = sequelize.define('Business', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id_negocio'
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'negocio_name'
    },
    direccion: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'negocio_direccion'
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'usuario',
            key: 'id_usuario'
        }
    }
}, {
    tableName: 'negocio',
    timestamps: false,
});

Business.belongsTo(User, { foreignKey: 'usuario_id' });
User.hasOne(Business, { foreignKey: 'usuario_id' });

module.exports = Business;
