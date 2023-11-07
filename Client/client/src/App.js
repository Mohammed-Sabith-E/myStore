import React, { useContext, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import './App.css'
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Products from './pages/products/Products';
import ViewProduct from './pages/viewProduct/ViewProduct';
import Account from './pages/account/Account';
import { AuthContext } from './context/AuthContext';
import Home from './pages/home/Home';
import Cart from './pages/cart/Cart';

function App() {
  const { userIsLoggedIn, setUserIsLoggedIn } = useContext(AuthContext)

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');

    // If the token exists, consider the user as authenticated
    if (authToken) {
      setUserIsLoggedIn(true);
    } else {
      setUserIsLoggedIn(false);
    }
  })

  return (
    <div className="App">
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<Products />} />
          <Route path="/" element={<Home />} />
          <Route path="/view-product/:id" element={<ViewProduct />} />
          <Route path="/login" element={userIsLoggedIn ? <Navigate to="/account" /> : <Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/account" element={userIsLoggedIn ? <Account /> : <Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}





export default App;
