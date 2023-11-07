const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Enter Full Name']
    },
    email: {
        type: String,
        required: [true, 'Enter Email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Enter Password']
    },
    cart: [{
        productId: String,
        quantity: Number
    }]
},
{
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);