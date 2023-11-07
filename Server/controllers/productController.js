const asyncHandler = require('express-async-handler')
const Product = require('../models/productModel')


//Display All Products
// GET /product/all
const displayAllProducts = asyncHandler(async (req, res) => {
    const products = await Product.find()
    res.status(201).json(products)
})

//Display Product which Requseted from Client
// POST /product/displayProduct
const displayProduct = asyncHandler(async (req, res) => {
    const id = req.params.id
    const product = await Product.findById(id)
    res.status(201).json(product)
})

module.exports = {
    displayAllProducts,
    displayProduct
}