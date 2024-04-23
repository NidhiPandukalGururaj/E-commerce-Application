const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Product } = require('./model');
const Cart = require('./cartmodel');

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://mongo:27017/productManagement', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post('/products', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).send(product);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    console.log('Fetched products:', products); // Debugging log
    res.status(200).send(products);
  } catch (error) {
    console.error('Error fetching products:', error); // Error log
    res.status(500).send(error);
  }
});


app.post('/cart/:userId', async (req, res) => {
  const { userId } = req.params;
  const { productId, quantity, name, description, price, imageUrl } = req.body;
  try {
    const product = await Product.findOne({ product_id: productId });
    if (!product) {
      return res.status(404).send({ message: 'Product not found' });
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [{ 
        productId, 
        quantity, 
        name,
        description,
        price,
        imageUrl
      }] });
    } else {
      let itemIndex = cart.items.findIndex(item => item.productId.toString() === productId.toString());
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ 
          productId, 
          quantity,
          name,
          description,
          price,
          imageUrl
        });
      }
    }
    await cart.save();
    res.status(200).send(cart);
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).send(error);
  }
});

const port = 3002;
app.listen(port, () => {
  console.log(`Product management service listening on port ${port}`);
});
