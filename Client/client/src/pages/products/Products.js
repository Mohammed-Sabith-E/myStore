import React, { useState, useEffect, useContext } from 'react'
import './Products.css'
import axios from 'axios'
import Header from '../../components/header/Header';
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'


function Products() {
    const [productsData, setProductsData] = useState([])
    const { userIsLoggedIn } = useContext(AuthContext)
    const authToken = localStorage.getItem('authToken')
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchProduct() {
            await axios.get('http://localhost:5000/api/products/all')
                .then(response => {
                    setProductsData(response.data)
                })
                .catch(error => {
                    console.error('Fetch error:', error);
                });
        }
        fetchProduct()
    });

    async function handleAddToCart(id) {
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
            } else {
                navigate('/login')
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleCardClick = (id) => {
        navigate(`/view-product/${id}`);
    }

    return (
        <div>
            <Header />
            <div className='products'>
                {productsData.map((product, index) => {
                    return (
                        <div className="card" key={index} >
                            <img className="card-img-top" src={product.productImage} alt='' />
                            <div className="card-body">
                                <h5 className="card-title" onClick={() => handleCardClick(product._id)}>{product.productName}</h5>
                                <p className="card-text card-price">₹ {product.productPrice}</p>
                                <button className="button" onClick={() => handleAddToCart(product._id)}>Add to Cart</button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Products