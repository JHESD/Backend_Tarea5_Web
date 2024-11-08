const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order_controllers');

router.post('/order', orderController.createOrder);
router.get('/order', orderController.getAllOrders);
router.get('/order/:id', orderController.getOrderById);
router.put('/order/:id', orderController.updateOrderStatus);
router.delete('/order/:id', orderController.deleteOrder);

module.exports = router;
