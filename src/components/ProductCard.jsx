import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';

function ProductCard({ item }) {
  const { addItem } = useContext(CartContext);
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = () => {
    addItem(item);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <div className="product-card-wrapper">
      <div className="card">
        <div className="card-image-box">
          <span className="card-badge-category">{item.category}</span>
          {item.rating && (
            <span className="card-rating-badge">
              ⭐ {item.rating.rate} <span style={{ opacity: 0.7, fontSize: '10px' }}>({item.rating.count})</span>
            </span>
          )}
          <img src={item.thumbnail} alt={item.title} />
        </div>

        <div className="card-content">
          <div className="card-details">
            <span className="card-category-subtext">{item.category}</span>
            <h2 title={item.title}>{item.title}</h2>
          </div>

          <div className="card-price-row">
            <span className="card-price">{Number(item.price).toFixed(2)}</span>
          </div>

          <button
            className={`add-to-cart-btn ${justAdded ? 'added' : ''}`}
            onClick={handleAdd}
            disabled={justAdded}
          >
            {justAdded ? (
              <>
                <span>✓</span>
                <span>Added to Cart!</span>
              </>
            ) : (
              <>
                <span>🛒</span>
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;