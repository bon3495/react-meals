import { useState } from 'react';

const useInput = handleValue => {
  const [enteredValue, setEnteredValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  const isValueValid = handleValue(enteredValue);
  const hasError = !isValueValid && isTouched;

  const changeValueHandler = e => {
    setEnteredValue(e.target.value);
  };

  const touchedHandler = e => {
    setIsTouched(true);
  };

  const resetValue = () => {
    setEnteredValue('');
    setIsTouched(false);
  };

  return {
    enteredValue,
    isValid: isValueValid,
    hasError,
    changeValueHandler,
    touchedHandler,
    resetValue,
  };
};

export default useInput;
