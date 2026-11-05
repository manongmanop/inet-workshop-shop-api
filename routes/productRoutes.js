const express = require('express');
const router = express.Router();

const {
    getProducts,
    getProductsById,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/productsController');

const {
    getOrdersByProduct,
    createOrder
} = require('../controllers/orderController');

router.route('/')
    .get(getProducts)
    .post(createProduct);

router.route('/:id')
    .get(getProductsById)
    .put(updateProduct)
    .delete(deleteProduct);

router.route('/:id/orders')
    .get(getOrdersByProduct)
    .post(createOrder);

module.exports = router;