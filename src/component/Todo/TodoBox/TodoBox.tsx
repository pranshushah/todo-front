import React, { useState, useRef } from 'react';
import Styles from './TodoBox.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as SolidStar } from '@fortawesome/free-solid-svg-icons';
import { useRecoilState } from 'recoil';
import { selectedTodo } from '../../../atoms/selectedTodoAtom';
import axios from 'axios';
import {
  todoBody,
  editImpStatus,
  editDoneStatus,
  editTitleStatus,
} from '../../../utils/types';
import { useSetAllTask } from '../../../utils/TaskListUpdater/useSetAllTask';
import Checkbox from '../../UI/CheckBox/CheckBox';
import AddStep from '../AddStep/AddStep';
import StepItem from '../StepItem/StepItem';
function TodoBox() {
  const [todo, setTodo] = useRecoilState(selectedTodo);
  const updateAllTask = useSetAllTask();
  const [todoInputValue, setTodoInputValue] = useState(todo?.todoTitle);
  const inputRef = useRef<HTMLInputElement | null>(null);

  async function todoImpStatusChangeHandler(newStauts: editImpStatus) {
    if (todo) {
      const res = await axios.patch<todoBody>(
        '/api/todo/edit/important',
        newStauts,
      );
      if (res.status === 200) {
        if (res.data.dueDate) {
          const newTodo = {
            ...res.data,
            createdAt: new Date(res.data.createdAt),
            dueDate: new Date(res.data.dueDate),
          };
          updateAllTask(todo, newTodo);
          setTodo(newTodo);
        } else {
          const newTodo = {
            ...res.data,
            createdAt: new Date(res.data.createdAt),
            dueDate: undefined,
          };
          updateAllTask(todo, newTodo);
          setTodo(newTodo);
        }
      }
    }
  }

  async function todoDoneStatusChangeHandler(newStauts: editDoneStatus) {
    if (todo) {
      const res = await axios.patch<todoBody>('/api/todo/edit/done', newStauts);
      if (res.status === 200) {
        if (res.data.dueDate) {
          const newTodo = {
            ...res.data,
            createdAt: new Date(res.data.createdAt),
            dueDate: new Date(res.data.dueDate),
          };
          updateAllTask(todo, newTodo);
          setTodo(newTodo);
        } else {
          const newTodo = {
            ...res.data,
            createdAt: new Date(res.data.createdAt),
            dueDate: undefined,
          };
          updateAllTask(todo, newTodo);
          setTodo(newTodo);
        }
      }
    }
  }

  async function todoTitleChangeHandler(newStatus: editTitleStatus) {
    if (todo) {
      const res = await axios.patch<todoBody>(
        '/api/todo/edit/title',
        newStatus,
      );
      if (res.status === 200) {
        if (res.data.dueDate) {
          const newTodo = {
            ...res.data,
            createdAt: new Date(res.data.createdAt),
            dueDate: new Date(res.data.dueDate),
          };
          updateAllTask(todo, newTodo);
          setTodo(newTodo);
        } else {
          const newTodo = {
            ...res.data,
            createdAt: new Date(res.data.createdAt),
            dueDate: undefined,
          };
          updateAllTask(todo, newTodo);
          setTodo(newTodo);
        }
      }
    }
  }

  function updateNewTodoTitle() {
    if (todo && todoInputValue) {
      if (todoInputValue?.trim() !== todo.todoTitle) {
        todoTitleChangeHandler({
          todoId: todo.id,
          newTodoTitle: todoInputValue?.trim(),
        });
      }
    }
    if (!todoInputValue?.trim()) {
      setTodoInputValue(todo?.todoTitle);
    }
  }

  function doneOnEnter(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      inputRef.current?.blur();
    }
  }

  function checkBoxChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    if (todo) {
      todoDoneStatusChangeHandler({ todoId: todo.id, done: e.target.checked });
    }
  }

  function impStatusChangeHandler() {
    if (todo) {
      todoImpStatusChangeHandler({
        todoId: todo.id,
        important: !todo.important,
      });
    }
  }

  function todoTitleInputChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setTodoInputValue(e.target.value);
  }

  const steps = todo?.steps.map((step, index) => (
    <StepItem step={step} key={index} />
  ));

  return todo ? (
    <div className={Styles.container}>
      <div className={Styles.textContainer}>
        <Checkbox onChange={checkBoxChangeHandler} checked={todo.done} />
        <input
          className={Styles.input}
          value={todoInputValue}
          onChange={todoTitleInputChangeHandler}
          onBlur={updateNewTodoTitle}
          ref={inputRef}
          onKeyUp={doneOnEnter}
        />
        {todo.important ? (
          <FontAwesomeIcon
            icon={SolidStar}
            className={Styles.impFilled}
            onClick={impStatusChangeHandler}
          />
        ) : (
          <FontAwesomeIcon
            icon={faStar}
            className={Styles.imp}
            onClick={impStatusChangeHandler}
          />
        )}
      </div>
      {steps}
      <AddStep />
    </div>
  ) : null;
}

export default TodoBox;
