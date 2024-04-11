// Payment.js
import React, { useState } from 'react';
import axios from 'axios';

function Payment() {
    const [paymentDetails, setPaymentDetails] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
    });

    const handleChange = (e) => {
        setPaymentDetails({
            ...paymentDetails,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3004/payment', paymentDetails);
            alert('Payment successful');
        } catch (error) {
            console.error('Payment failed:', error);
            alert('Payment failed.');
        }
    };

    return (
        <div className="payment-container">
            <h2>Payment</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Card Number:</label>
                    <input type="text" name="cardNumber" value={paymentDetails.cardNumber} onChange={handleChange} />
                </div>
                <div>
                    <label>Expiry Date:</label>
                    <input type="text" name="expiryDate" value={paymentDetails.expiryDate} onChange={handleChange} />
                </div>
                <div>
                    <label>CVV:</label>
                    <input type="text" name="cvv" value={paymentDetails.cvv} onChange={handleChange} />
                </div>
                <button type="submit">Pay Now</button>
            </form>
        </div>
    );
}

export default Payment;
