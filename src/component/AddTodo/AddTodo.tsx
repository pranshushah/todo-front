import plus from '../../utils/svg/plus.svg';
import circle from '../../utils/svg/circle.svg';
import React, { useState } from 'react';
import Styles from './AddTodo.module.scss';
function AddTodo() {
  const [textFocus, setTextFocus] = useState(false);
  const [inputText, setInputText] = useState('');
  function inputFocusHandler() {
    setTextFocus(true);
  }
  function inputBlurHandler() {
    setTextFocus(false);
  }
  function inputChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setInputText(e.target.value.trim());
  }
  return (
    <div
      className={
        textFocus
          ? [Styles.container, Styles.containerFocused].join(' ')
          : Styles.container
      }>
      <div className={Styles.plusContainer}>
        <img
          src={textFocus ? circle : plus}
          alt='add svg'
          className={Styles.plus}
        />
      </div>
      <input
        type='text'
        placeholder='Add a Task'
        className={Styles.input}
        onFocus={inputFocusHandler}
        onBlur={inputBlurHandler}
        value={inputText}
        onChange={inputChangeHandler}
      />
      {inputText.length > 0 ? (
        <div className={Styles.addButton}>Add</div>
      ) : null}
    </div>
  );
}

export default AddTodo;
