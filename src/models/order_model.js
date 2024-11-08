const { DataTypes } = require('sequelize');
const sequelize = require('../db/db_confing');
const OrderDetail = require('./orderdetail_model');

const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id_pedido'
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'pedido_fecha'
    },
    total: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        field: 'pedido_total'
    },
    direccion: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'pedido_direccion'
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'pedido_estado'
    },

}, {
    tableName: 'pedido',
    timestamps: false,
});

Order.hasMany(OrderDetail, { foreignKey: 'pedido_id', as: 'Detalle_Pedido', onDelete: 'CASCADE' });
OrderDetail.belongsTo(Order, { foreignKey: 'pedido_id' });


module.exports = Order;
