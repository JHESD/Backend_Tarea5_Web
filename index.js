const express = require('express');
const app = express();
require('./src/associations/category_associations');
require('dotenv').config();

const userRoutes = require('./src/routes/user_routes');
const productRoutes = require('./src/routes/product_routes');
const orderdetailRoutes = require('./src/routes/orderdetail_routes')
const orderRoutes = require('./src/routes/order_routes')
const categoryRoutes = require('./src/routes/category_routes')
const businessRoutes = require('./src/routes/business_routes')

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orderdetail', orderdetailRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/business', businessRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
