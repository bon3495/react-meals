import React, { useContext, useState, useEffect } from 'react';
import classes from './HeaderCartBtn.module.css';
import CartIcon from '../Carts/CartIcon';
import CartContext from '../../store/cart-context';

const HeaderCartBtn = props => {
  const cartCtx = useContext(CartContext);
  const [animationCart, setAnimationCart] = useState(false);
  const btnClasses = `${classes.button} ${animationCart ? classes.bump : ''}`;

  const quantityInCart = cartCtx.items.reduce((cur, acc) => {
    return cur + acc.amount;
  }, 0);

  useEffect(() => {
    if (cartCtx.items.length === 0) return;
    setAnimationCart(true);
    const timer = setTimeout(() => {
      setAnimationCart(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [cartCtx.items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{quantityInCart}</span>
    </button>
  );
};

export default HeaderCartBtn;
