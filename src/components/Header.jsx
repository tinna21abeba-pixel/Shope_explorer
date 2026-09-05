
import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../context/CartContext';

function Header() {
  const { cart, total, isCartOpen, setIsCartOpen, lastAddedId } = useContext(CartContext);
  const [bouncing, setBouncing] = useState(false);

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    if (lastAddedId) {
      setBouncing(true);
      const timer = setTimeout(() => setBouncing(false), 500);
      return () => clearTimeout(timer);
    }
  }, [lastAddedId, cart]);

  return (
    <div className="header-wrapper">
      <header className="header">
        <div className="header-brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="brand-icon-wrapper">
            🛒
          </div>
          <h1>Shop Explorer</h1>
        </div>

        <div className="header-actions">
          <div className="header-total-pill">
            <span>Total Price:</span>
            <span className="total-value">${Number(total).toFixed(2)}</span>
          </div>

          <button
            className="cart-toggle-btn"
            onClick={() => setIsCartOpen(!isCartOpen)}
            aria-label="View shopping cart"
          >
            <span>Cart</span>
            <span className={`cart-btn-badge ${bouncing ? 'bounce' : ''}`}>
              {totalQuantity || cart.length}
            </span>
          </button>
        </div>
      </header>
    </div>
  );
}

export default Header;


