const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: [true, 'Enter Product Name']
    },
    productDescription: {
        type: String,
        required: [true, 'Enter Product Description']
    },
    productImage: {
        type: String,
        required: true
    },
    productPrice: {
        type: Number,
        required: [true, 'Enter Product Price']
    },
    productFeatures: [String],
    productColors: [String],
},
    {
        timestamps: true
    });

module.exports = mongoose.model('Product', productSchema);