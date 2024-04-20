import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

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

  const addToCart = async (product) => {
    try {
      if (!quantity[product.product_id]) {
        throw new Error('Quantity not found');
      }
      const response = await axios.post(`http://localhost:3003/cart/${userId}`, {
        productId: product.product_id,
        quantity: quantity[product.product_id],
        name: product.name,
        description: product.description,
        price: product.price,
        imageUrl: product.img_url,
      });
      const updatedCart = response.data.items;
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
      setCart(updatedCart);
      alert('Item added to cart successfully');
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
    <div className="container">
      <nav className="w-full flex justify-between p-4 bg-chocolate text-chocolate z-50">
        <div className="text-xxl font-bold">GadgetHub</div>
        <div className="text-xxl font-bold flex space-x-4">
          <Link href="/" className="hover:underline">Home Page</Link>
          <Link href="/Cart" className="hover:underline">Cart</Link>
        </div>
      </nav>
      <div className="product-list-container">
        <h1 className="heading text-center">Product List</h1>
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.product_id} className="product-item">
              <div className="d-flex justify-content-between align-items-center">
                <h3>{product.name}</h3>
                <img src={product.img_url} alt={product.name} className="product-image" />
                <p>Price: Rs. {product.price}</p>
                <p>Description: {product.description}</p>
                <p>Stock: {product.inStock ? 'Available' : 'Out of Stock'}</p>
              </div>
              <div className="product-actions">
                <input
                  type="number"
                  min="1"
                  value={quantity[product.product_id] || 1}
                  onChange={(e) => handleQuantityChange(product.product_id, parseInt(e.target.value))}
                />
                <button onClick={() => addToCart(product)}>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* CSS styles */}
      <style jsx>{`
        .container {
          text-align: center;
          background-color: lightyellow;
          padding: 20px;
          min-height: 100vh;
          border: 2px;
        }

        .heading {
          font-size: 2rem;
        }

        .product-list-container {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          width: 100%;
          padding: 20px;
        }

        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
          width: 100%;
          max-width: 1200px;
        }

        .product-item {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          border: 1px solid #ccc;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .product-details {
          flex: 1;
          margin-top: 20px;
          text-align: center; // Center align the images
        }

        .product-actions {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 20px;
        }

        .product-image {
          max-width: 100px;
          align: center;
          height: auto;
          margin-bottom: 10px;
        }

      `}</style>
    </div>
  );
}

export default Product;
