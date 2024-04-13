import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [userId, setUserId] = useState('');

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            setUserId(storedUserId);
        }
    }, []);

    useEffect(() => {
        if (userId) {
            const fetchCartItems = async () => {
                try {
                    const response = await axios.get(`http://localhost:3003/cart/${userId}`);
                    setCartItems(response.data.items);
                } catch (error) {
                    console.error('Error fetching cart items:', error);
                    alert('Failed to load cart items.');
                }
            };

            fetchCartItems();
        }
    }, [userId]);

    const handleRemoveItem = async (itemId) => {
        try {
            await axios.delete(`http://localhost:3003/cart/${userId}/items/${itemId}`);
            const updatedCart = cartItems.filter(item => item._id.toString() !== itemId);
            setCartItems(updatedCart);
        } catch (error) {
            console.error('Error removing item:', error);
            alert('Failed to remove item.');
        }
    };

    return (
        <div className="cart-container">
            <h2>Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <ul>
                    {cartItems.map(item => (
                        <li key={item._id}>
                            <h3>{item.name}</h3>
                            <p>Price: Rs. {item.price}</p>
                            <p>Description: {item.description}</p>
                            <p>Quantity: {item.quantity}</p>
                            <button onClick={() => handleRemoveItem(item._id)}>Remove</button>
                        </li>
                    ))}
                </ul>
            )}
            <button onClick={() => alert('Proceed to payment')}>Checkout</button>
        </div>
    );
}

export default Cart;
