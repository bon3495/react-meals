import React, { useContext } from 'react';
import MealItemForm from './MealItemForm';
import classes from './MealItem.module.css';
import CartContext from '../../../store/cart-context';

const MealItem = props => {
  const cartCtx = useContext(CartContext);
  const price = `$${props.price.toFixed(2)}`;
  const addToCartHandler = amount => {
    const newItem = {
      name: props.name,
      price: props.price,
      id: props.id,
      amount: amount,
    };
    cartCtx.addItem(newItem);
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <span className={classes.price}>{price}</span>
      </div>
      <div>
        <MealItemForm id={props.id} onGetAmount={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
