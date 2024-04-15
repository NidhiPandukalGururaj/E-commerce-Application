import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

function Payment() {
    const [paymentDetails, setPaymentDetails] = useState({
        paymentMethod: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        bankName: '',
        accountNumber: '',
        upiId: '',
    });

    const [onlinePaymentMethod, setOnlinePaymentMethod] = useState('');

    const handleChange = (e) => {
        if (e.target.name === 'paymentMethod') {
            setOnlinePaymentMethod(e.target.value);
        }
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
        <div className="container">
            <nav className="w-full flex justify-between p-4 bg-chocolate text-chocolate z-50">
                <div className="text-xxl font-bold">My E-Commerce</div>
                <div className="text-xxl font-bold flex space-x-4">
                    <Link href="/" className="hover:underline">HomePage</Link>
                    <Link href="/Cart" className="hover:underline">Cart</Link>
                    <Link href="/Product" className="hover:underline">Products</Link>
                </div>
            </nav>
            <div className="payment-container">
                <h2 className="heading text-center">Payments</h2>
                <form onSubmit={handleSubmit}>
                    <div className="payment-methods">
                        <label>
                            <input 
                                type="radio" 
                                name="paymentMethod" 
                                value="cashOnDelivery" 
                                checked={paymentDetails.paymentMethod === 'cashOnDelivery'} 
                                onChange={handleChange} 
                            />
                            Cash On Delivery
                        </label>
                        <br />
                        <label>
                            <input 
                                type="radio" 
                                name="paymentMethod" 
                                value="onlinePayment" 
                                checked={paymentDetails.paymentMethod === 'onlinePayment'} 
                                onChange={handleChange} 
                            />
                            Online Payment
                        </label>
                        <br />
                        <label>
                            <input 
                                type="radio" 
                                name="paymentMethod" 
                                value="netBanking" 
                                checked={paymentDetails.paymentMethod === 'netBanking'} 
                                onChange={handleChange} 
                            />
                            Net Banking
                        </label>
                        <br />
                        <label>
                            <input 
                                type="radio" 
                                name="paymentMethod" 
                                value="creditCard" 
                                checked={paymentDetails.paymentMethod === 'creditCard'} 
                                onChange={handleChange} 
                            />
                            Credit Card
                        </label>
                        <br />
                        <label>
                            <input 
                                type="radio" 
                                name="paymentMethod" 
                                value="debitCard" 
                                checked={paymentDetails.paymentMethod === 'debitCard'} 
                                onChange={handleChange} 
                            />
                            Debit Card
                        </label>
                        {onlinePaymentMethod && (
                            <>
                                <br />
                                <label>
                                    <input 
                                        type="radio" 
                                        name="paymentMethod" 
                                        value="gPay" 
                                        checked={onlinePaymentMethod === 'gPay'} 
                                        onChange={handleChange} 
                                    />
                                    GPay
                                </label>
                                <br />
                                <label>
                                    <input 
                                        type="radio" 
                                        name="paymentMethod" 
                                        value="paytm" 
                                        checked={onlinePaymentMethod === 'paytm'} 
                                        onChange={handleChange} 
                                    />
                                    Paytm
                                </label>
                                <br />
                                <label>
                                    <input 
                                        type="radio" 
                                        name="paymentMethod" 
                                        value="phonePe" 
                                        checked={onlinePaymentMethod === 'phonePe'} 
                                        onChange={handleChange} 
                                    />
                                    PhonePe
                                </label>
                                <br />
                                <label>
                                    <input 
                                        type="radio" 
                                        name="paymentMethod" 
                                        value="bhimUPI" 
                                        checked={onlinePaymentMethod === 'bhimUPI'} 
                                        onChange={handleChange} 
                                    />
                                    BhimUPI
                                </label>
                                <br />
                                <div>
                                    <label>UPI ID:</label>
                                    <input 
                                        type="text" 
                                        name="upiId" 
                                        value={paymentDetails.upiId} 
                                        onChange={handleChange} 
                                    />
                                </div>
                            </>
                        )}
                    </div>
                    {paymentDetails.paymentMethod === 'creditCard' || paymentDetails.paymentMethod === 'debitCard' ? (
                        <>
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
                        </>
                    ) : paymentDetails.paymentMethod === 'netBanking' ? (
                        <>
                            <div>
                                <label>Bank Name:</label>
                                <input type="text" name="bankName" value={paymentDetails.bankName} onChange={handleChange} />
                            </div>
                            <div>
                                <label>Account Number:</label>
                                <input type="text" name="accountNumber" value={paymentDetails.accountNumber} onChange={handleChange} />
                            </div>
                        </>
                    ) : null}
                    <button type="submit">Pay Now</button>
                </form>
            </div>
            <style jsx>{`
                .container {
                    text-align: center;
                }

                .heading {
                    font-size: 2.5rem;
                    margin-bottom: 20px;
                }

                .payment-container {
                    margin-top: 40px;
                }

                .payment-methods {
                    font-size: 1.2rem;
                    margin-bottom: 20px;
                }

                /* Additional styles for the navbar */
                /* ... */
            `}</style>
        </div>
    );
}

export default Payment;
