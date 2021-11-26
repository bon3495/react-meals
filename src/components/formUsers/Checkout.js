import React, { useState } from 'react';
import useInput from '../../hooks/use-input';
import classes from './Checkout.module.css';

const Checkout = props => {
  const {
    enteredValue: enteredNameInput,
    isValid: isNameValid,
    hasError: isNameError,
    changeValueHandler: changeNameInputHandler,
    touchedHandler: nameTouchedHandler,
    resetValue: resetNameValue,
  } = useInput(value => value.trim() !== '');

  const {
    enteredValue: enteredAddressInput,
    isValid: isAddressValid,
    hasError: isAddressError,
    changeValueHandler: changeAddressInputHandler,
    touchedHandler: addressTouchedHandler,
    resetValue: resetAddressValue,
  } = useInput(value => value.trim() !== '');

  const {
    enteredValue: enteredCityInput,
    isValid: isCityValid,
    hasError: isCityError,
    changeValueHandler: changeCityInputHandler,
    touchedHandler: cityTouchedHandler,
    resetValue: resetCityValue,
  } = useInput(value => value.trim() !== '');

  const inputErrorClasses = isError =>
    `${classes.control} ${isError ? classes.invalid : ''}`;

  const submitHandler = e => {
    e.preventDefault();
    const isFormInvalid = !isNameValid || !isAddressValid || !isCityValid;

    if (isFormInvalid) {
      return;
    }

    resetNameValue();
    resetAddressValue();
    resetCityValue();
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={inputErrorClasses(isNameError)}>
        <label htmlFor="name">Your Name</label>
        <input
          id="name"
          type="text"
          value={enteredNameInput}
          onChange={changeNameInputHandler}
          onBlur={nameTouchedHandler}
        />
      </div>
      <div className={inputErrorClasses(isAddressError)}>
        <label htmlFor="address">Your Address</label>
        <input
          id="address"
          type="text"
          value={enteredAddressInput}
          onChange={changeAddressInputHandler}
          onBlur={addressTouchedHandler}
        />
      </div>
      <div className={inputErrorClasses(isCityError)}>
        <label htmlFor="city">City</label>
        <input
          id="city"
          type="text"
          value={enteredCityInput}
          onChange={changeCityInputHandler}
          onBlur={cityTouchedHandler}
        />
      </div>
      <div className={classes.actions}>
        <button className={classes.submit}>Confirm</button>
        <button onClick={props.onClick}>Cancel</button>
      </div>
    </form>
  );
};

export default Checkout;
