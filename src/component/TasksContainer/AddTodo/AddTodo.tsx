import plus from '../../../utils/svg/plus.svg';
import circle from '../../../utils/svg/circle.svg';
import React, { useState } from 'react';
import Styles from './AddTodo.module.scss';
import axios from 'axios';
import { todoBody, todoType } from '../../../utils/types/userInfo';

type AddTodoProps = {
  onAddTodo: (todo: todoType) => void;
};

function AddTodo({ onAddTodo }: AddTodoProps) {
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

  async function addTodoHandler() {
    const todoTitle = inputText.trim();
    if (todoTitle) {
      const res = await axios.post<todoBody>('/api/todo/new', {
        todoTitle,
      });
      onAddTodo({ ...res.data, createdAt: new Date(res.data.createdAt) });
    }
  }

  function enterHandler(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      addTodoHandler();
      setInputText('');
    }
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
        onKeyPress={enterHandler}
      />
      {inputText.length > 0 ? (
        <div className={Styles.addButton}>Add</div>
      ) : null}
    </div>
  );
}

export default AddTodo;
