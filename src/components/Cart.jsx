
import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';

function Cart() {
  const {
    cart,
    removeFromCart,
    addItem,
    decreaseQuantity,
    clearCart,
    total,
    isCartOpen,
    setIsCartOpen,
  } = useContext(CartContext);

  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  if (!isCartOpen) return null;

  const totalItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setCheckoutSuccess(true);
    setTimeout(() => {
      clearCart();
      setCheckoutSuccess(false);
      setIsCartOpen(false);
      alert('🎉 Order Placed Successfully! Thank you for shopping with Shop Explorer.');
    }, 1200);
  };

  return (
    <>
      <div
        className="cart-backdrop"
        onClick={() => setIsCartOpen(false)}
        aria-hidden="true"
      />
      
      <aside className="cart-drawer" aria-label="Shopping Cart Drawer">
        <div className="cart-drawer-header">
          <div className="cart-header-title">
            <span>🛒</span>
            <span>Your Cart</span>
            <span className="cart-items-count-tag">
              {totalItemCount} {totalItemCount === 1 ? 'item' : 'items'}
            </span>
          </div>

          <button
            className="cart-close-btn"
            onClick={() => setIsCartOpen(false)}
            title="Close cart"
          >
            ✕
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="cart-empty-state">
            <div className="empty-cart-icon">🛍️</div>
            <h3>Your cart is empty</h3>
            <p>Looks like you haven't added anything to your cart yet.</p>
            <button
              className="start-shopping-btn"
              onClick={() => setIsCartOpen(false)}
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items-list">
              {cart.map((product) => (
                <div key={product.id} className="cart-item">
                  <div className="cart-item-img-wrap">
                    <img src={product.image} alt={product.title} />
                  </div>

                  <div className="cart-item-details">
                    <span className="cart-item-category">{product.category}</span>
                    <span className="cart-item-title" title={product.title}>
                      {product.title}
                    </span>
                    <span className="cart-item-price">
                      ${(product.price * product.quantity).toFixed(2)}
                    </span>
                  </div>

                  <div className="cart-item-actions">
                    <div className="cart-qty-pill">
                      <button
                        className="qty-btn"
                        onClick={() => decreaseQuantity ? decreaseQuantity(product.id) : removeFromCart(product.id)}
                        title="Decrease quantity"
                      >
                        -
                      </button>
                      <span>{product.quantity}</span>
                      <button
                        className="qty-btn"
                        onClick={() => addItem(product)}
                        title="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <button
                      className="cart-remove-btn"
                      onClick={() => removeFromCart(product.id)}
                    >
                      🗑 Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-drawer-footer">
              <div className="cart-total-row">
                <span>Subtotal</span>
                <span>${Number(total).toFixed(2)}</span>
              </div>
              <div className="cart-total-row">
                <span>Shipping</span>
                <span style={{ color: '#34d399', fontWeight: 600 }}>FREE</span>
              </div>
              <div className="cart-total-row cart-grand-total">
                <span>Total Price</span>
                <span className="total-amount">${Number(total).toFixed(2)}</span>
              </div>

              <button
                className="checkout-btn"
                onClick={handleCheckout}
                disabled={checkoutSuccess}
              >
                {checkoutSuccess ? (
                  <span>Processing Order... ✨</span>
                ) : (
                  <>
                    <span>Proceed to Checkout</span>
                    <span>→</span>
                  </>
                )}
              </button>

              <div className="cart-footer-perk">
                🔒 Safe & Secure 256-Bit SSL Checkout
              </div>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

export default Cart;