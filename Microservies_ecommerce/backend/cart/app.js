const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Cart = require('./model'); // Correct import

const app = express();

app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/cartService', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.post('/cart/:userId', async (req, res) => {
  const { userId } = req.params;
  const { productId, quantity ,name,description, price, imageUrl} = req.body;

  console.log('Received request to add item to cart:', { userId, productId, quantity, name,price }); // Debug log

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId });
    }

    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity, name, description, price, imageUrl });
    }

    await cart.save();

    console.log('Successfully saved cart:', cart); // Debug log
    res.status(200).send(cart);
  } catch (error) {
    console.error('Error adding to cart:', error.message);
    res.status(500).send(error.message);
  }
});


app.get('/cart/:userId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) {
      return res.status(404).send('Cart not found');
    }
    res.status(200).send(cart);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.delete('/cart/:userId/items/:itemId', async (req, res) => {
  const { userId, itemId } = req.params;

  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).send('Cart not found');
    }
    cart.items = cart.items.filter(item => item._id.toString() !== itemId);
    await cart.save();
    res.status(200).send(cart);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.delete('/cart/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOneAndDelete({ userId });
    if (!cart) {
      return res.status(404).send('Cart not found');
    }
    res.status(200).send('Cart deleted successfully');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Cart service listening on port ${PORT}`);
});

module.exports = Cart;
