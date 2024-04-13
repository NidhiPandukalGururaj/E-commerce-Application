import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cart, setCart] = useState({});
  const [quantity, setQuantity] = useState({});
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || {};

    if (!storedUserId) {
      setError('User ID not found');
      setLoading(false);
      return;
    }

    setUserId(storedUserId);
    setCart(storedCartItems);

    axios.get(`http://localhost:3002/products?userId=${storedUserId}`)
      .then((response) => {
        setProducts(response.data);
        const initialQuantity = {};
        response.data.forEach((product) => {
          initialQuantity[product.product_id] = 1;
        });
        setQuantity(initialQuantity);
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, []);

  const addToCart = async (productId) => {
    try {
      if (!quantity[productId]) {
        throw new Error('Quantity not found');
      }
      const response = await axios.post(`http://localhost:3003/cart/${userId}`, {
        productId,
        quantity: quantity[productId],
      });
      const updatedCart = response.data.items;
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
      setCart(updatedCart);
    } catch (error) {
      console.error('Error adding to cart:', error);
      if (error.response) {
        console.error('Server Response:', error.response.data);
        alert(`Failed to add item to cart: ${error.response.data}`);
      } else {
        alert('Failed to add item to cart. Please check the console for more details.');
      }
    }
  };
  
  const handleQuantityChange = (productId, value) => {
    const newQuantity = { ...quantity };
    newQuantity[productId] = value;
    setQuantity(newQuantity);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="product-list-container">
      <h2 className="heading">Product List</h2>
      <ul className="product-grid">
        {products.map((product) => (
          <li key={product.product_id} className="product-item">
            <div>
              <h3>{product.name}</h3>
              <p>Price: Rs. {product.price}</p>
              <p>Description: {product.description}</p>
              <p>Stock: {product.inStock ? 'Available' : 'Out of Stock'}</p>
              <div>
                <input
                  type="number"
                  min="1"
                  value={quantity[product.product_id] || 1}
                  onChange={(e) => handleQuantityChange(product.product_id, parseInt(e.target.value))}
                />
                <button onClick={() => addToCart(product.product_id)}>Add to Cart</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {/* CSS styles */}
      <style jsx>{`
        /* CSS styles here */
      `}</style>
    </div>
  );
}

export default Product;
