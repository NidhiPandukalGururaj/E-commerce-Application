const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  userId: {
    type: Number, // Assuming userId is a string in the user table
    required: true
  },
  orderId: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['cashOnDelivery', 'onlinePayment', 'netBanking', 'creditCard', 'debitCard', 'gPay', 'paytm', 'phonePe', 'bhimUPI']
  },
  status: {
    type: String,
    required: true,
    default: 'Pending',
    enum: ['Pending', 'Successful', 'Failed']
  }
}, { timestamps: true });

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
