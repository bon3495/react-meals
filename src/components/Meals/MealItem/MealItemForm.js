import React, { useRef, useState } from 'react';
import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';

const MealItemForm = props => {
  const inputValueRef = useRef();
  const [isAmountValid, setIsAmountValid] = useState(true);

  const submitHandler = e => {
    e.preventDefault();

    const amountInput = inputValueRef.current.value;
    const amountInputNumber = +amountInput;
    if (
      amountInput.trim().length === 0 ||
      amountInputNumber < 1 ||
      amountInputNumber > 5
    ) {
      setIsAmountValid(false);
      return;
    }
    setIsAmountValid(true);
    props.onGetAmount(amountInputNumber);
    inputValueRef.current.value = '1';
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={inputValueRef}
        key={props.id}
        label="Amount"
        input={{
          id: props.id,
          type: 'number',
          defaultValue: '1',
          min: '1',
          max: '5',
          step: '1',
        }}
      />
      <button>+ Add</button>
      {!isAmountValid && <p>Please enter amount valid (1-5)</p>}
    </form>
  );
};

export default MealItemForm;
