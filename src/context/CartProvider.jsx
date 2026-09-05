import { useState, useReducer } from "react";
import { CartContext } from "./CartContext";
import { cartReducer } from "../reducers/cartReducer";

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, []);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [lastAddedId, setLastAddedId] = useState(null);

  function addItem(product) {
    dispatch({
      type: "ADD_ITEM",
      product,
    });
    setLastAddedId(product.id);
  }

  function removeFromCart(id) {
    dispatch({
      type: "REMOVE_ITEM",
      id,
    });
  }

  function decreaseQuantity(id) {
    dispatch({
      type: "DECREASE_QUANTITY",
      id,
    });
  }

  function clearCart() {
    dispatch({
      type: "CLEAR_CART",
    });
  }

  const total = Number(
    cart
      .reduce((sum, item) => sum + item.price * item.quantity, 0)
      .toFixed(2)
  );

  const totalItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeFromCart,
        decreaseQuantity,
        clearCart,
        total,
        totalItemCount,
        isCartOpen,
        setIsCartOpen,
        lastAddedId,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}