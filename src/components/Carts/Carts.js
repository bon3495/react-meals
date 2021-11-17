import React, { useContext } from 'react';
import Modal from '../UI/Modal';
import CartItem from './CartItem/CartItem';
import classes from './Carts.module.css';
import CartContext from '../../store/cart-context';

const Carts = props => {
  const cartCtx = useContext(CartContext);
  const isCartEmpty = cartCtx.items.length > 0;
  const totalAmount = `$${
    isCartEmpty ? cartCtx.totalAmount.toFixed(2) : '0.00'
  }`;

  const removeItemHandler = id => {
    cartCtx.removeItem(id);
  };

  const addItemHandler = item => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartsList = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map(item => (
        <CartItem
          key={item.id}
          {...item}
          onRemove={removeItemHandler.bind(null, item.id)}
          onAdd={addItemHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  return (
    <Modal onClose={props.onClose}>
      {cartsList}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>
          Close
        </button>
        {isCartEmpty && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Carts;
