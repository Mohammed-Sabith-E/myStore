const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const router = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const Product = require('./models/productModel')
const dotenv = require('dotenv');

dotenv.config();
const port = process.env.PORT || 5000;

connectDB()
const app = express()
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/user', router)
app.use('/api/products', productRoutes)

// //Product Sample
// const productData = {
//     productName: 'Wool Kashmiri Design Jamawar Shawl',
//     productDescription: 'This ostentatious Kashmiri jamawar shawl is adorned with intricate and meticulous paisley and floral designs tracing their roots to centuries-old Kashmiri heritage.',
//     productImage: 'https://kashmirorigin.com/wp-content/uploads/2022/08/21204.jpg',
//     productPrice: 900,
//     productFeatures: [
//         'Dry Clean Only. Size: 40 X 80 Inches',
//         'This ostentatious Kashmiri jamawar shawl is adorned with intricate and meticulous paisley and floral designs tracing their roots to centuries old Kashmiri heritage.',
//         'These luxurious shawls form the perfect gift for your loved ones as they are specifically engineered to drape naturally over your casual or formal wear. While our shawls are designed to stand out in every season, the wool content in these shawls will keep you warm while guaranteeing the softness of natural woollen fibres.',
//         'Pair these shawls with your favorite suits, Kurtis, coats, jackets or experiment with anything in your wardrobe. Ideal for both home and outdoor use.',
//         'Flawlessly and Elegantly paired with formal and casual wear.'
//     ],
//     productColors: ['red', 'blue']
// };

// const newProduct = new Product(productData);
// newProduct.save()                 


app.listen(port, function () {
    console.log('Server Started on ', port); 
}) 