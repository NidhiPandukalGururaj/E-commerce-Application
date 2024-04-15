const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Product } = require('./model');
const Cart = require('../cart/model'); // Assuming you have a cart model defined

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/productManagement', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// POST route to add a new product
app.post('/products', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).send(product);
  } catch (error) {
    res.status(400).send(error);
  }
});

// GET route to list all products for a specific user
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find(); // Fetch all products
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send(error);
  }
});

// POST route to add or update items in the cart
app.post('/cart', async (req, res) => {
  const { userId, productId, quantity } = req.body;
  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [{ productId, quantity }] });
    } else {
      let itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }
    }
    await cart.save();
    res.status(200).send(cart);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Other routes...

const port = 3002;
app.listen(port, () => {
  console.log(`Product management service listening on port ${port}`);
});
