// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Payment = require('./model');
const cors = require('cors');
const app = express();
app.use(bodyParser.json());

app.use(cors());

// MongoDB connection string
mongoose.connect('mongodb://mongo:27017/paymentService', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Process payment
app.post('/payment', async (req, res) => {
  const { userId, orderId, amount, paymentMethod } = req.body;
  try {
    // Simulate payment processing
    const payment = new Payment({
      userId,
      orderId,
      amount,
      paymentMethod,
      status: 'Successful' // Assume payment is always successful for this mock
    });
    await payment.save();
    res.status(200).send({ message: 'Payment processed successfully', payment });
  } catch (error) {
    console.error('Error processing payment:', error.message);
    res.status(500).send({ message: 'Failed to process payment', error: error.message });
  }
});

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
  console.log(`Payment service listening on port ${PORT}`);
});
