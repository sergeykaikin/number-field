import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { getUniqueId } from '../../utils';

import './NumberField.css';

const NumberField = ({ label, value, onChange }) => {
  const idSuffix = useRef(getUniqueId());
  const [number, setNumber] = useState(value);
  const updateValue = value => {
    setNumber(value);
    onChange(value);
  };
  const handleChange = event => void updateValue(Number(event.target.value));
  const handleDecrease = () => void updateValue(number - 1);
  const handleIncrease = () => void updateValue(number + 1);
  const shouldPreventInput = newValue => {
    const newNumberValue = Number(newValue);

    if (isNaN(newNumberValue) || String(newValue).length !== newNumberValue.toFixed(0).length || newNumberValue < 0) {
      return true;
    }

    return false;
  }
  const handleKeyPress = (event) => {
    const { value, selectionStart, selectionEnd } = event.target;
    const { key: inputChar } = event;

    if (shouldPreventInput(`${value.slice(0, selectionStart)}${inputChar}${value.slice(selectionEnd, value.length)}`)) {
      event.preventDefault();
    }
  }
  const handlePaste = event => {
    if (shouldPreventInput(event.clipboardData.getData('Text'))) {
      event.preventDefault();
    }
  }

  return (
    <div className="number-field">
      <label className="number-field__label" htmlFor={`number-field-${idSuffix.current}`}>{label}</label>
      <button
        className="number-field__button number-field__button--minus"
        disabled={number === 0}
        type="button"
        onClick={number === 0 ? undefined : handleDecrease}
      >
        -
      </button>
      <input
        className="number-field__input"
        id={`number-field-${idSuffix.current}`}
        type="text"
        min="0"
        inputMode="numeric"
        pattern="[0-9]*"
        value={number}
        onKeyPress={handleKeyPress}
        onPaste={handlePaste}
        onChange={handleChange}
      />
      <button
        className="number-field__button number-field__button--plus"
        type="button"
        onClick={handleIncrease}
      >
        +
      </button>
    </div>
  )
};

NumberField.defaultProps = {
  value: 0,
  onChange: undefined
};

NumberField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number,
  onChange: PropTypes.func
};

export default React.memo(NumberField);
