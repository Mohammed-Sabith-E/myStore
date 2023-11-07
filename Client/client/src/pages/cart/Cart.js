import React, { useState, useEffect } from 'react'
import './Cart.css'
import Header from '../../components/header/Header'
import axios from 'axios'

function Cart() {
    const [cartItems, setCartItems] = useState([])
    const authToken = localStorage.getItem('authToken')

    const total = cartItems.reduce((total, item) => total + item.quantity * item.productPrice, 0);

    console.log(total); // 300


    async function increaseQuantity(productId) {
        // Create a copy of the cart items array
        const updatedCartItems = [...cartItems];
        const itemIndex = updatedCartItems.findIndex(item => item.productId === productId);

        if (itemIndex !== -1) {
            // Increment the quantity of the item in the copy
            updatedCartItems[itemIndex].quantity++;
            setCartItems(updatedCartItems);
        }

        try {
            await axios.post('http://localhost:5000/api/user/cart', {
                productID: updatedCartItems[itemIndex].productId,
                quantity: cartItems[itemIndex].quantity
            }, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            }).then(response => {
                console.log('Updated cart items');
            })
        } catch (error) {
            console.log(error);
        }
    }

    async function decreaseQuantity(productId) {
        // Create a copy of the cart items array
        const updatedCartItems = [...cartItems];
        const itemIndex = updatedCartItems.findIndex(item => item.productId === productId);

        if (itemIndex !== -1) {
            // Decrement the quantity of the item in the copy (if it's greater than 1)
            if (updatedCartItems[itemIndex].quantity > 0) {
                updatedCartItems[itemIndex].quantity--;
            }

            // If the quantity becomes 0, remove the item from the cart
            if (updatedCartItems[itemIndex].quantity === 0) {
                updatedCartItems.splice(itemIndex, 1);
            }

            setCartItems(updatedCartItems);

            try {
                // Send a request to update the cart on the server
                await axios.post('http://localhost:5000/api/user/cart', {
                    productID: productId,
                    quantity: cartItems[itemIndex].quantity,
                }, {
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    }
                });
                console.log('Item updated in cart');
            } catch (error) {
                console.log(error);
            }

        }
    }

    useEffect(() => {
        async function fetchCartItems() {
            try {
                const response = await axios.get('http://localhost:5000/api/user/cart', {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                });
                setCartItems(response.data);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        }

        fetchCartItems();
    }, [authToken]);
    return (
        <div className='cart'>
            <Header />
            {cartItems && cartItems.length > 0 ?
                <div className='cart-container'>
                    <div className='left'>
                        <div className='left-main'>
                            <h1>Cart</h1>
                            <h1>{cartItems ? cartItems.length : ''} Items</h1>
                        </div>
                        <hr />
                        <table>
                            <tbody>
                                <tr>
                                    <th></th>
                                    <th>Item</th>
                                    <th>Price</th>
                                    <th className='quantity-head'>Quantity</th>
                                    <th>Total</th>
                                </tr>
                                {cartItems.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td><img src={item.productImage} alt="" /></td>
                                            <td className='item-name'>{item.productName}</td>
                                            <td>₹{item.productPrice}</td>
                                            <td className='quantity'>
                                                <div className='quantity-container'>
                                                    <button onClick={() => decreaseQuantity(item.productId)}><i class="fa-solid fa-minus"></i></button>
                                                    <label htmlFor="" >{item.quantity}</label>
                                                    <button onClick={() => increaseQuantity(item.productId)}><i class="fa-solid fa-plus"></i></button>
                                                </div>
                                            </td>
                                            <td>₹{item.productPrice * item.quantity}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        {cartItems.map((item, index) => {
                            return (
                                <div className='cart-mobile-view'>
                                    <div className='tittle-image'>
                                        <img src={item.productImage} alt="" />
                                        <div>
                                            <p>{item.productName}</p>
                                            <p>₹{item.productPrice}</p>
                                        </div>
                                    </div>
                                    <div className='quantity-amount'>
                                        <div className='quantity-container'>
                                            <button onClick={() => decreaseQuantity(item.productId)}><i class="fa-solid fa-minus"></i></button>
                                            <label htmlFor="" >{item.quantity}</label>
                                            <button onClick={() => increaseQuantity(item.productId)}><i class="fa-solid fa-plus"></i></button>
                                        </div>
                                        <p>₹{item.productPrice * item.quantity}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className='right'>
                        <div className='right-main'>
                            <h1>Order Summary</h1>
                        </div>
                        <hr />
                        <div className='itemTotal'>
                            <p>{cartItems ? cartItems.length : ''} Items</p>
                            <p>₹{total}</p>
                        </div>
                        <div className='total'>
                            <p>Total cost</p>
                            <p>₹{total}</p>
                        </div>
                        <div>
                            <button>Check Out</button>
                        </div>
                    </div>
                </div>
                :
                <div className='cart-empty'>
                    <h1>You Cart is Empty</h1>
                    <a href="/products"><i class="fa-solid fa-arrow-left"></i>Back to Shopping</a>
                </div>
            }
        </div>
    )
}

export default Cart