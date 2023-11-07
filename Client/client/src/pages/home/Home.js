import React, { useContext, useState, useEffect } from 'react'
import './Home.css'
import Header from '../../components/header/Header'
import { AuthContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Home() {
    const [productsData, setProductsData] = useState([])
    const { userIsLoggedIn } = useContext(AuthContext)
    const authToken = localStorage.getItem('authToken')
    const navigate = useNavigate()

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

    const handleCardClick = (id) => {
        navigate(`/view-product/${id}`);
    }

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

    //Scrolling Cards
    const leftScroll = () => {
        const left = document.querySelector(".card-main");
        left.scrollBy(-300, 0);
        console.log('left');
    }

    const rightScroll = () => {
        const right = document.querySelector(".card-main");
        right.scrollBy(300, 0);
        console.log('right');
    }

    return (
        <div className='home'>
            <Header />
            <div className='home-container'>
                <div className='main-content'>
                    <p>We stay on top <br />so you can be on top.</p>
                    <h4>Grand Festive Discounts</h4>
                    {userIsLoggedIn
                        ? <button onClick={() => { navigate('/products') }}>SHOP NOW</button>
                        : <button onClick={() => { navigate('/login') }}>GET STARTED</button>
                    }
                </div>
                <img src="/images/20943930.jpg" alt="" />
            </div>
            <div className='home-products'>
                {productsData && productsData.length > 0
                    ? <h3>Our Products</h3>
                    : ''
                }
                <div className='main-container'>
                    {productsData && productsData.length > 0
                        ? <button className="left" onClick={() => leftScroll()}>
                            <i class="fas fa-angle-double-left"></i>
                        </button>
                        : ''
                    }
                    <div className='card-main'>
                        {productsData ? productsData.slice(0, 6).map((product, index) => {
                            return (
                                <div className="product-card" key={index} >
                                    <img className="product-card-img-top" src={product.productImage} alt='' />
                                    <div className="product-card-body">
                                        <h5 className="product-card-title" onClick={() => handleCardClick(product._id)}>{product.productName}</h5>
                                        <p className="product-card-text card-price">₹ {product.productPrice}</p>
                                        <button className="button" onClick={() => handleAddToCart(product._id)}>Add to Cart</button>
                                    </div>
                                </div>
                            )
                        })
                            :
                            ''
                        }
                    </div>
                    {productsData && productsData.length > 0
                        ? <button className="right" onClick={() => rightScroll()}>
                            <i class="fas fa-angle-double-right"></i>
                        </button>
                        : ''
                    }
                </div>
            </div>
        </div>
    )
}

export default Home