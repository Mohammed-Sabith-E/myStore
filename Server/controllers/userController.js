const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const User = require('../models/userModel')
const Product = require('../models/productModel')
const jwt = require('jsonwebtoken')


// Register New User
// POST /register
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    const userExist = await User.findOne({ email })

    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please Enter Details')
    }

    if (userExist) {
        res.status(400)
        throw new Error('User Already Exist')
    }

    //Password Hashing
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id, user.email)
        })
    } else {
        res.status(400)
        throw new Error('Invalid User Data')
    }
})

// Login Current User
// POST /login
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id, user.email)
        })
    } else {
        res.status(400)
        throw new Error('Invalid Credentials')
    }
})

// Logout User
// POST /logout
const logoutUser = (req, res) => {
    res.json({ message: 'Logout User' })
}

// User Data
// GET /user
const userData = asyncHandler(async (req, res) => {
    const { _id, name, email } = await User.findById(req.user.id)
    res.status(200).json({
        id: _id,
        name,
        email
    })
})

// Add to Cart
// POST /cart
const addToCart = asyncHandler(async (req, res) => {
    const userID = await req.user.id
    const { productID, quantity } = req.body

    try {
        if (quantity === 0) {
            await User.updateOne(
                { _id: userID },
                { $pull: { cart: { productId: productID } } }
            )
        } else {
            // Check if the product is already in the cart.
            const existingProduct = await User.findOne({
                _id: userID,
                'cart.productId': productID,
            });

            if (existingProduct) {
                await User.updateOne(
                    { _id: userID, 'cart.productId': productID },
                    { $set: { 'cart.$.quantity': quantity } }
                );
            } else {
                await User.updateOne(
                    { _id: userID },
                    { $push: { cart: { productId: productID, quantity: quantity } } }
                );
            }
        }
        res.status(200).json({
            message: 'Added to Cart'
        })
    } catch (error) {
        throw new Error('Failed to add items to cart')
    }
})


// Get cart Items
// GET /cart
const getCartItems = asyncHandler(async (req, res) => {
    const userID = await req.user.id

    try {
        const user = await User.findById(userID)

        // Create an array of promises to fetch product details
        const promises = user.cart.map(async (cartItem) => {
            const product = await Product.findOne({ _id: cartItem.productId });
            return {
                productId: cartItem.productId,
                productName: product.productName,
                productImage: product.productImage,
                productDescription: product.productDescription,
                productPrice: product.productPrice,
                quantity: cartItem.quantity,
            };
        });

        // Use Promise.all to execute the promises concurrently
        const cartDetails = await Promise.all(promises);

        res.status(200).json(cartDetails);
    } catch (error) {
        throw new Error('Cart Items cant fetch')
    }
})


//Generate JSON Token
const generateToken = (id, email) => {
    return jwt.sign({ id, email }, process.env.JWT_SECRET_KEY, {
        expiresIn: '30d'
    })
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    userData,
    addToCart,
    getCartItems
}