const express = require('express');
const router = express.Router();
const productController = require('../controllers/product_controllers');

router.post('/products', productController.createProduct);
router.get('/products', productController.getProducts);
router.get('/products/business/:id_negocio', productController.getProductsByBusiness);
router.get('/products/categories', productController.getProductsByCategories);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);

module.exports = router;
