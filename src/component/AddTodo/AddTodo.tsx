import plus from '../../utils/svg/plus.svg';
import circle from '../../utils/svg/circle.svg';
import React, { useState } from 'react';
import Styles from './AddTodo.module.scss';
import Input from '../UI/Input/Input';

type AddTodoProps = {
  onAddTodo: (title: string, todoId?: null | string) => Promise<void>;
  placeholder: string;
};

function AddTodo({ onAddTodo, placeholder }: AddTodoProps) {
  const [textFocus, setTextFocus] = useState(false);
  const [inputText, setInputText] = useState('');

  function inputFocusHandler() {
    setTextFocus(true);
  }

  function inputBlurHandler() {
    setTextFocus(false);
  }

  function inputChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setInputText(e.target.value);
  }

  function enterHandler(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      addTodoHandler();
      setInputText('');
    }
  }

  function addTodoHandler() {
    onAddTodo(inputText.trim());
    setInputText('');
  }

  return (
    <div
      className={
        textFocus
          ? [Styles.container, Styles.containerFocused].join(' ')
          : Styles.container
      }
    >
      <div className={Styles.plusContainer}>
        <img
          src={textFocus ? circle : plus}
          alt='add svg'
          className={Styles.plus}
        />
      </div>
      <Input
        addTodo
        type='text'
        placeholder={placeholder}
        className={Styles.input}
        onFocus={inputFocusHandler}
        onBlur={inputBlurHandler}
        value={inputText}
        onChange={inputChangeHandler}
        onKeyUp={enterHandler}
      />
      {inputText.length > 0 ? (
        <div className={Styles.addButton} onClick={addTodoHandler}>
          Add
        </div>
      ) : null}
    </div>
  );
}

export default AddTodo;
