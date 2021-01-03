import plus from '../../../utils/svg/plus.svg';
import circle from '../../../utils/svg/circle.svg';
import React, { useState } from 'react';
import Styles from './AddStep.module.scss';
import { selectedTodo } from '../../../atoms/selectedTodoAtom';
import { useRecoilValue } from 'recoil';
import axios from '../../../axios';
import { todoBody } from '../../../utils/types';
import { useSetTaskFromTaskDetails } from '../../../utils/customHooks/useUpdateTaskFromTaskDetails';
import { useSetNotification } from '../../../utils/customHooks/useAddNotification';
import { timeMessageObjCreate } from '../../../utils/helperFunction/timeoutMessage';
function AddTodo() {
  const [textFocus, setTextFocus] = useState(false);
  const [inputText, setInputText] = useState('');
  const todo = useRecoilValue(selectedTodo);
  const updateTaskFromDetails = useSetTaskFromTaskDetails();
  const { addNotification } = useSetNotification();

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
    }
  }

  async function addTodoHandler() {
    try {
      if (window.navigator.onLine) {
        const res = await axios.post<todoBody>(
          '/api/step/new',
          {
            todoId: todo?.id,
            stepTitle: inputText.trim(),
          },
          timeMessageObjCreate('Unable to add step todo'),
        );
        if (res.status === 200 && todo) {
          updateTaskFromDetails(todo, res.data, 'todoBody');
          setInputText('');
        }
      } else {
        throw new Error('No internet connection');
      }
    } catch (e) {
      addNotification(e.message, 'Network Error');
    }
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
