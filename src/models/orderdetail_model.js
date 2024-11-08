const { DataTypes } = require('sequelize');
const sequelize = require('../db/db_confing');
const Product = require('./product_model');
const User = require('./user_model');

const OrderDetail = sequelize.define('OrderDetail', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id_det_pedido'
    },
    cantidad: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'det_pedid_cantidad'
    },
    precio_unitario: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        field: 'det_pedid_precio_unitario'
    },
    subtotal: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        field: 'det_pedid_subtotal'
    },
    producto_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'producto',
            key: 'id_producto'
        }
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
    tableName: 'detalle_pedido',
    timestamps: false,
});

OrderDetail.belongsTo(Product, { foreignKey: 'producto_id' });
OrderDetail.belongsTo(User, { foreignKey: 'usuario_id' });


module.exports = OrderDetail;
