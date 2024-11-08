const OrderDetail = require('../models/orderdetail_model');
const Product = require('../models/product_model');
const User = require('../models/user_model');

exports.createOrderDetail = async (req, res) => {
    try {
        const { id_producto, id_usuario, cantidad, precio_unitario } = req.body;

        const subtotal = cantidad * precio_unitario;

        const newOrderDetail = await OrderDetail.create({
            id_producto,
            id_usuario,
            cantidad,
            precio_unitario,
            subtotal
        });

        res.status(201).json(newOrderDetail);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el detalle del pedido', details: error.message });
    }
};

exports.getAllOrderDetails = async (req, res) => {
    try {
        const orderDetails = await OrderDetail.findAll({
            include: [
                { model: Product },
                { model: User }
            ]
        });
        res.status(200).json(orderDetails);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los detalles de pedido', details: error.message });
    }
};

exports.getOrderDetailById = async (req, res) => {
    try {
        const { id } = req.params;
        const orderDetail = await OrderDetail.findByPk(id, {
            include: [
                { model: Product },
                { model: User }
            ]
        });

        if (!orderDetail) {
            return res.status(404).json({ error: 'Detalle de pedido no encontrado' });
        }

        res.status(200).json(orderDetail);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el detalle de pedido', details: error.message });
    }
};

exports.updateOrderDetail = async (req, res) => {
    try {
        const { id } = req.params;
        const { cantidad, precio_unitario } = req.body;

        const orderDetail = await OrderDetail.findByPk(id);
        if (!orderDetail) {
            return res.status(404).json({ error: 'Detalle de pedido no encontrado' });
        }

        orderDetail.cantidad = cantidad || orderDetail.cantidad;
        orderDetail.precio_unitario = precio_unitario || orderDetail.precio_unitario;
        orderDetail.subtotal = orderDetail.cantidad * orderDetail.precio_unitario;

        await orderDetail.save();
        res.status(200).json(orderDetail);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el detalle de pedido', details: error.message });
    }
};

exports.deleteOrderDetail = async (req, res) => {
    try {
        const { id } = req.params;

        const orderDetail = await OrderDetail.findByPk(id);
        if (!orderDetail) {
            return res.status(404).json({ error: 'Detalle de pedido no encontrado' });
        }

        await orderDetail.destroy();
        res.status(200).json({ message: 'Detalle de pedido eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el detalle de pedido', details: error.message });
    }
};
