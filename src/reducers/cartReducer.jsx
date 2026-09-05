export function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.find((item) => item.id === action.product.id);
      if (existingItem) {
        return state.map((item) =>
          item.id === action.product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...state, { ...action.product, quantity: 1 }];
    }

    case "REMOVE_ITEM": {
      return state.filter((item) => item.id !== action.id);
    }

    case "DECREASE_QUANTITY": {
      const target = state.find((item) => item.id === action.id);
      if (target && target.quantity > 1) {
        return state.map((item) =>
          item.id === action.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
      return state.filter((item) => item.id !== action.id);
    }

    case "CLEAR_CART": {
      return [];
    }

    default:
      return state;
  }
}