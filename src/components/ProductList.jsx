import React from 'react';
import ProductCard from './ProductCard';

function ProductList({ product = [], addToCart }) {
  if (product.length === 0) {
    return (
      <div className="no-results-box">
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
        <h3>No Products Found</h3>
        <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
          We couldn't find any products matching your search or filter. Try checking different keywords or categories!
        </p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {product.map((item) => (
        <ProductCard key={item.id} item={item} addToCart={addToCart} />
      ))}
    </div>
  );
}

export default ProductList;