// routes/orderDetailRoutes.js
const express = require('express');
const router = express.Router();
const orderDetailController = require('../controllers/orderdetail_controllers');

router.post('/order-detail', orderDetailController.createOrderDetail);
router.get('/order-detail', orderDetailController.getAllOrderDetails);
router.get('/order-detail/:id', orderDetailController.getOrderDetailById);
router.put('/order-detail/:id', orderDetailController.updateOrderDetail);
router.delete('/order-detail/:id', orderDetailController.deleteOrderDetail);

module.exports = router;
