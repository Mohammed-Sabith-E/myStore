const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser, userData, addToCart, getCartItems } = require('../controllers/userController');
const { protectRoutes } = require('../middleware/authMiddleware')


router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)
router.get('/userData', protectRoutes, userData)
router.post('/cart', protectRoutes, addToCart)
router.get('/cart', protectRoutes, getCartItems)

module.exports = router;