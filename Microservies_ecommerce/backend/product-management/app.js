const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { Product } = require('./models');

const app = express();
app.use(cors());
app.use(express.json());

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

// GET route to list all products
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send(error);
  }
});

// GET route to fetch a specific product by ID
app.get('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).send();
    }
    res.status(200).send(product);
  } catch (error) {
    res.status(500).send(error);
  }
});

const port = 3001; // Consider running this on a different port if your user management service is on 3000
app.listen(port, () => {
  console.log(`Product management service listening on port ${port}`);
});
