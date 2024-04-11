// ProductDetails.js
import React, { useEffect, useState } from 'react';
import './Product.css'; // Importing the CSS file for styling

function ProductDetails({ productId }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`API_ENDPOINT_HERE/${productId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Product not found');
        }
        return response.json();
      })
      .then(data => setProduct(data))
      .catch(error => setError(error.message))
      .finally(() => setLoading(false));
  }, [productId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!product) return <p>No product found.</p>;

  return (
    <div className="product">
      <h2 className="product-title">{product.name}</h2>
      <p className="product-description">{product.description}</p>
      <p className="product-price">${product.price}</p>
      <p className="product-stock">{product.inStock ? 'In Stock' : 'Out of Stock'}</p>
    </div>
  );
}

export default ProductDetails;
