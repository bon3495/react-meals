import React, { useState, useContext, Fragment } from 'react';
import Modal from '../UI/Modal';
import CartItem from './CartItem/CartItem';
import classes from './Carts.module.css';
import CartContext from '../../store/cart-context';
import Checkout from '../formUsers/Checkout';
import useHttp from '../../hooks/use-http';

const Carts = props => {
  const cartCtx = useContext(CartContext);
  const [isConfirm, setIsConfirm] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
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

  const confirmHandler = e => {
    setIsConfirm(true);
  };

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onClose}>
        Close
      </button>
      {isCartEmpty && (
        <button className={classes.button} onClick={confirmHandler}>
          Order
        </button>
      )}
    </div>
  );

  const {
    sendRequest: sendOrderForm,
    error: errorOrderSubmit,
    isLoading,
  } = useHttp();

  const orderConfirmHandler = form => {
    const ordersForm = {
      orderItems: cartCtx.items,
      user: form,
      totalAmount: cartCtx.totalAmount.toFixed(2),
    };

    sendOrderForm(
      {
        url: 'https://react-custom-hooks-5f0f7-default-rtdb.firebaseio.com/meals-orders.json',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: ordersForm,
      },
      data => {
        console.log(data);
      }
    );
    setDidSubmit(true);
    cartCtx.clearItems();
  };

  let modalContent = (
    <Fragment>
      {cartsList}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isConfirm && (
        <Checkout
          onClick={props.onClose}
          items={cartCtx.items}
          totalAmount={cartCtx.totalAmount}
          onOrderConfirm={orderConfirmHandler}
        />
      )}
      {!isConfirm && modalActions}
    </Fragment>
  );

  if (isLoading) modalContent = <p>Sending order data...</p>;
  if (!isLoading && didSubmit)
    modalContent = (
      <Fragment>
        <p>Successfully sent the order!</p>
        <div className={classes.actions}>
          <button className={classes.button} onClick={props.onClose}>
            Close
          </button>
        </div>
      </Fragment>
    );
  if (errorOrderSubmit)
    modalContent = <p>Sending order data error. Try again!</p>;

  return <Modal onClose={props.onClose}>{modalContent}</Modal>;
};

export default Carts;
