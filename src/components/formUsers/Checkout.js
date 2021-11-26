import React from 'react';
import useInput from '../../hooks/use-input';
import classes from './Checkout.module.css';

const Checkout = props => {
  // const [isFormValid, setIsFormValid] = useState(false);
  const {
    enteredValue: enteredNameInput,
    isValid: isNameValid,
    hasError: isNameError,
    changeValueHandler: changeNameInputHandler,
    touchedHandler: nameTouchedHandler,
    resetValue: resetNameValue,
  } = useInput(value => value.trim() !== '');

  const submitHandler = e => {
    e.preventDefault();
    const isFormInvalid = !isNameValid;

    if (isFormInvalid) return;

    console.log(enteredNameInput);
    resetNameValue();
  };

  const nameClasses = `${classes.control} ${isNameError ? 'invalid' : ''}`;

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={nameClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          id="name"
          type="text"
          value={enteredNameInput}
          onChange={changeNameInputHandler}
          onBlur={nameTouchedHandler}
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
