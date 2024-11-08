const Order = require('../models/order_model');
const OrderDetail = require('../models/orderdetail_model');

exports.createOrder = async (req, res) => {
    try {
        const { fecha, total, direccion, estado, detalles } = req.body;

        const newOrder = await Order.create({
            fecha,
            total,
            direccion,
            estado
        });

        if (detalles && detalles.length > 0) {
            const orderDetails = detalles.map(detalle => ({
                ...detalle,
                id_pedido: newOrder.id
            }));
            await OrderDetail.bulkCreate(orderDetails);
        }

        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el pedido', details: error.message });
    }
};

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({
            include: [
                {
                    model: OrderDetail,
                    as: 'Detalle_Pedido'
                }
            ]
        });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los pedidos', details: error.message });
    }
};

exports.getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findByPk(id, {
            include: [
                {
                    model: OrderDetail,
                    as: 'Detalle_Pedido'
                }
            ]
        });

        if (!order) {
            return res.status(404).json({ error: 'Pedido no encontrado' });
        }

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el pedido', details: error.message });
    }
};

exports.updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { estado } = req.body;

        const order = await Order.findByPk(id);
        if (!order) {
            return res.status(404).json({ error: 'Pedido no encontrado' });
        }

        order.estado = estado;
        await order.save();

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el estado del pedido', details: error.message });
    }
};

exports.deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;

        const order = await Order.findByPk(id);
        if (!order) {
            return res.status(404).json({ error: 'Pedido no encontrado' });
        }

        await order.destroy();
        res.status(200).json({ message: 'Pedido eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el pedido', details: error.message });
    }
};
