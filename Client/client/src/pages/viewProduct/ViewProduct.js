import React, { useEffect, useState, useContext } from 'react'
import './ViewProduct.css'
import Header from '../../components/header/Header'
import { useParams } from 'react-router-dom';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'


function ViewProduct() {
    const { id } = useParams();
    const [productData, setProductData] = useState([])
    const authToken = localStorage.getItem('authToken')
    const navigate = useNavigate()
    const { userIsLoggedIn } = useContext(AuthContext)

    async function handleAddToCart() {
        try {
            if (userIsLoggedIn) {
                await axios.post('http://localhost:5000/api/user/cart', { productID: id, quantity: 1 }, {
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    }
                }).then(response => {
                    navigate('/cart')
                    console.log('Added to cart', response);
                })
            }else{
                navigate('/login')
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        async function fetchProduct() {
            await axios.post(`http://localhost:5000/api/products/displayProduct/${id}`)
                .then(response => {
                    setProductData(response.data)
                })
                .catch(error => {
                    console.error('Fetch error:', error);
                });
        }
        fetchProduct()
    });
    return (
        <div className='viewProduct'>
            <Header></Header>
            <div className='product-data' >
                <div className='product-image'>
                    <img src={productData.productImage} alt="" />
                </div>
                <div className='product-details'>
                    <h1>{productData.productName}</h1>
                    <a href="/products">Rating & Review</a>
                    <hr />
                    <h1 className='price'>₹ {productData.productPrice}</h1>
                    <button onClick={handleAddToCart}>Add to Cart</button>
                    <div className='colors'>
                        <p>Color</p>
                        <ul>
                            {productData.productColors ? (
                                productData.productColors.map((color, index) => ( 
                                    <li key={index}>{color}</li>
                                ))
                            ) : (
                                <li>Color information not available.</li>
                            )}
                        </ul>
                    </div>
                    <div className='description'>
                        <p>Description</p>
                        <p>{productData.productDescription}</p>
                    </div>
                    <div className='features'>
                        <p>Features</p>
                        <ul>
                            {productData.productFeatures ? (
                                productData.productFeatures.map((feature, index) => (
                                    <li key={index}>{feature}</li>
                                ))
                            ) : (
                                <li>No product features available.</li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewProduct