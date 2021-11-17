import React, { useReducer } from 'react';
import CartContext from './cart-context';

const cartStateDefault = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === 'ADD') {
    let updatedCartItems;
    const index = state.items.findIndex(item => item.id === action.item.id);
    const existingCart = state.items[index];
    if (!existingCart) {
      updatedCartItems = state.items.concat(action.item);
    } else {
      const updatedCartItem = {
        ...existingCart,
        amount: existingCart.amount + action.item.amount,
      };
      updatedCartItems = [...state.items];
      updatedCartItems[index] = updatedCartItem;
    }
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    return {
      items: updatedCartItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === 'REMOVE') {
    let updatedCartItems;
    const index = state.items.findIndex(item => item.id === action.id);
    const existingCart = state.items[index];
    const updatedTotalAmount = state.totalAmount - existingCart.price;
    if (existingCart.amount === 1) {
      updatedCartItems = state.items.filter(item => item.id !== action.id);
    } else {
      const updatedCartItem = {
        ...existingCart,
        amount: existingCart.amount - 1,
      };
      updatedCartItems = [...state.items];
      updatedCartItems[index] = updatedCartItem;
    }
    return {
      items: updatedCartItems,
      totalAmount: updatedTotalAmount,
    };
  }

  return cartStateDefault;
};

const CartProvider = props => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    cartStateDefault
  );

  const addItemHandler = item => {
    dispatchCartAction({
      type: 'ADD',
      item,
    });
  };

  const removeItemHandler = id => {
    dispatchCartAction({
      type: 'REMOVE',
      id,
    });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
