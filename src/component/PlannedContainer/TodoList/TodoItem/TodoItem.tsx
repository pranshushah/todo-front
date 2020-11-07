import React from 'react';
import axios from 'axios';
import { useSetAllTask } from '../../../../utils/TaskListUpdater/useSetAllTask';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faSun } from '@fortawesome/free-regular-svg-icons';
import { faStar as SolidStar } from '@fortawesome/free-solid-svg-icons';
import {
  plannedTodoType,
  plannedTodoBodyType,
  editDoneStatus,
  editImpStatus,
} from '../../../../utils/types';
import Styles from './TodoItem.module.scss';
import Checkbox from '../../../UI/CheckBox/CheckBox';
type TodoItemProps = {
  todo: plannedTodoType;
};

function TodoITem({ todo }: TodoItemProps) {
  const updateAllTasks = useSetAllTask();
  async function todoDoneStatusChangeHandler(newStauts: editDoneStatus) {
    const res = await axios.patch<plannedTodoBodyType>(
      '/api/todo/edit/done',
      newStauts,
    );
    if (res.status === 200) {
      updateAllTasks(todo, {
        ...res.data,
        createdAt: new Date(res.data.createdAt),
        dueDate: new Date(res.data.dueDate),
      });
    }
  }

  async function todoImpStatusChangeHandler(newStauts: editImpStatus) {
    const res = await axios.patch<plannedTodoBodyType>(
      '/api/todo/edit/important',
      newStauts,
    );
    if (res.status === 200) {
      updateAllTasks(todo, {
        ...res.data,
        createdAt: new Date(res.data.createdAt),
        dueDate: new Date(res.data.dueDate),
      });
    }
  }
  function checkBoxChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    todoDoneStatusChangeHandler({ todoId: todo.id, done: e.target.checked });
  }
  function impStatusChangeHandler() {
    todoImpStatusChangeHandler({ todoId: todo.id, important: !todo.important });
  }
  return (
    <div className={Styles.container}>
      <Checkbox onChange={checkBoxChangeHandler} checked={todo.done} />
      <div className={Styles.textContainer}>
        <div
          className={
            todo.done ? [Styles.text, Styles.doneText].join(' ') : Styles.text
          }>
          {todo.todoTitle}
        </div>
        {todo.myDay ? (
          <span className={Styles.myday}>
            <FontAwesomeIcon icon={faSun} style={{ paddingRight: '5px' }} />
            My Day
          </span>
        ) : (
          ''
        )}
      </div>
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
  );
}

export default TodoITem;
