const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  product_id: { type: Number, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  inStock: { type: Boolean, default: true }
});

const Product = mongoose.model('Product', productSchema);

module.exports = { Product };
