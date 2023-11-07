const express = require('express');
const productRoutes = express.Router();
const { displayAllProducts, displayProduct } = require('../controllers/productController')

productRoutes.get('/all', displayAllProducts)
productRoutes.post('/displayProduct/:id', displayProduct)

module.exports = productRoutes; 