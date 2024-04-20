import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [userId, setUserId] = useState('');
    const [totalAmount, setTotalAmount] = useState(0);

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

    useEffect(() => {
        let total = 0;
        cartItems.forEach(item => {
            total += item.price * item.quantity;
        });
        setTotalAmount(total);
    }, [cartItems]);

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
        <div className="container">
            <nav className="w-full flex justify-between p-4 bg-chocolate text-chocolate z-50">
                <div className="text-xxl font-bold">GadgetHub</div>
                <div className="text-xxl font-bold flex space-x-4">
                    <Link href="/" className="hover:underline">Home Page</Link>
                    <Link href="/Product" className="hover:underline">Product</Link>
                </div>
            </nav>
            <div className="cart-container mt-4">
                <h2>Cart</h2>
                {cartItems.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <>
                        <ul className="list-group">
                            {cartItems.map(item => (
                                <li key={item._id} className="list-group-item">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <h3>{item.name}</h3>
                                        <img src={item.imageUrl} alt={item.name} className="product-image" />
                                        <p>Price: Rs. {item.price}</p><br></br>
                                        <p>Description: {item.description}</p><br></br>
                                        <p>Quantity: {item.quantity}</p><br></br>
                                        <button onClick={() => handleRemoveItem(item._id)} className="btn btn-danger">Remove</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="d-grid gap-2 mt-4"><br></br>
                            <Link href={{ pathname: "/Payment", query: { totalAmount } }}>
                                <button className="btn btn-primary">Checkout</button>
                            </Link>
                        </div>
                    </>
                )}
            </div>
            {/* CSS styles */}
            <style jsx>{`
                .container {
                    text-align: center;
                    background-color: lightyellow;
                    padding: 20px;
                    min-height: 100vh;
                    border: 2px;
                }

                .heading {
                    font-size: 2rem;
                }

                .cart-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                    width: 100%;
                    padding: 20px;
                }

                .list-group {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                    gap: 20px;
                    width: 100%;
                    max-width: 1200px;
                }

                .list-group-item {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    align-items: center;
                    border: 1px solid #ccc;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }

                .d-grid {
                    display: grid;
                    gap: 20px;
                    width: 100%;
                    max-width: 1200px;
                }
                .product-image {
                    max-width: 200px;
                    height: auto;
                    margin-bottom: 10px;
                }
                .btn-primary {
                    border: 1px solid blue;
                    background-color: lightblue; // Add border to checkout button
                }
                .btn-danger {
                    border: 1px solid red;  
                    background-color: lightpink; // Add border to remove button
                }

            `}</style>
        </div>
    );
}

export default Cart;
