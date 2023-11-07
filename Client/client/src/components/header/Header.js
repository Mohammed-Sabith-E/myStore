import React, { useEffect } from 'react'
import './Header.css'

function Header() {
    useEffect(() => {
        const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileMenuClose = document.getElementById('mobile-menu-close');

        mobileMenuToggle.addEventListener('click', () => {
            mobileMenu.style.display = 'flex';
        });

        mobileMenuClose.addEventListener('click', () => {
            mobileMenu.style.display = 'none';
        });

        // Cleanup event listeners when the component unmounts
        return () => {
            mobileMenuToggle.removeEventListener('click', () => {
                mobileMenu.style.display = 'flex';
            });
            mobileMenuClose.removeEventListener('click', () => {
                mobileMenu.style.display = 'none';
            });
        };
    }, []);
    return (
        <div className='header'>
            <nav className='navbar'>
                <h2><a href="/">myStore</a></h2>
                <i className="fa-solid fa-bars" id="mobile-menu-toggle"></i>
                <div id="mobile-menu" className='main-nav'>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/products">Products</a></li>
                        <li><a href="/cart">Cart</a></li>
                        <li><a href="/account">Account</a></li>
                    </ul>
                    <div>
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <input type="text" placeholder='Shirt for men...' />
                        <i className="fa-solid fa-x" id="mobile-menu-close"></i>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Header