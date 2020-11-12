import plus from '../../../utils/svg/plus.svg';
import circle from '../../../utils/svg/circle.svg';
import React, { useState } from 'react';
import Styles from './AddStep.module.scss';
import { selectedTodo } from '../../../atoms/selectedTodoAtom';
import { useRecoilState } from 'recoil';
import { useSetAllTask } from '../../../utils/TaskListUpdater/useSetAllTask';
import axios from 'axios';
import { todoBody } from '../../../utils/types';

function AddTodo() {
  const [textFocus, setTextFocus] = useState(false);
  const [inputText, setInputText] = useState('');
  const [todo, setTodo] = useRecoilState(selectedTodo);
  const updateAllTask = useSetAllTask();
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

  async function addTodoHandler() {
    const res = await axios.post<todoBody>('/api/step/new', {
      todoId: todo?.id,
      stepTitle: inputText.trim(),
    });
    console.log(res.data);
    if (res.status === 200 && todo) {
      if (res.data.dueDate) {
        updateAllTask(todo, {
          ...res.data,
          createdAt: new Date(res.data.createdAt),
          dueDate: new Date(res.data.dueDate),
        });
        setTodo({
          ...res.data,
          createdAt: new Date(res.data.createdAt),
          dueDate: new Date(res.data.dueDate),
        });
      } else {
        updateAllTask(todo, {
          ...res.data,
          createdAt: new Date(res.data.createdAt),
          dueDate: undefined,
        });
        setTodo({
          ...res.data,
          createdAt: new Date(res.data.createdAt),
          dueDate: undefined,
        });
      }
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
        placeholder={'Add Step'}
        className={Styles.input}
        onFocus={inputFocusHandler}
        onBlur={inputBlurHandler}
        value={inputText}
        onChange={inputChangeHandler}
        onKeyPress={enterHandler}
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
