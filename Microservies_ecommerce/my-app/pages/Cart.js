// Cart.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Cart() {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get('http://localhost:3003/cart');
                setCartItems(response.data.items);
            } catch (error) {
                console.error('Error fetching cart items:', error);
                alert('Failed to load cart items.');
            }
        };

        fetchCartItems();
    }, []);

    return (
        <div className="cart-container">
            <h2>Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <ul>
                    {cartItems.map(item => (
                        <li key={item.productId}>
                            {item.name} - ${item.price} x {item.quantity}
                        </li>
                    ))}
                </ul>
            )}
            <button onClick={() => alert('Proceed to payment')}>Checkout</button>
        </div>
    );
}

export default Cart;
