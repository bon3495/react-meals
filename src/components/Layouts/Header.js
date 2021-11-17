import React, { Fragment } from 'react';
import mealsImg from '../../assets/img/meals.jpg';
import classes from './Header.module.css';
import HeaderCartBtn from './HeaderCartBtn';

const Header = props => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h2>ReactMeals</h2>
        <HeaderCartBtn onClick={props.onShowCart} />
      </header>
      <div className={classes['main-image']}>
        <img src={mealsImg} alt="meals meals" />
      </div>
    </Fragment>
  );
};

export default Header;
