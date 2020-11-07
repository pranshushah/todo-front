import React from 'react';
import axios from 'axios';
import {
  todoType,
  todoBody,
  editDoneStatus,
  editImpStatus,
  todoFrom,
} from '../../utils/types';
import { useSetAllTask } from '../../utils/TaskListUpdater/useSetAllTask';
import Styles from './CompletedItem.module.scss';
import Checkbox from '../UI/CheckBox/CheckBox';
import Daydisplay from '../Daydisplay/Daydisplay';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as SolidStar, faSun } from '@fortawesome/free-solid-svg-icons';
type taskItemProps = {
  todo: todoType;
  from?: todoFrom;
};

function CompletedTaskItem({ from, todo }: taskItemProps) {
  const updateAllTasks = useSetAllTask();
  async function todoDoneStatusChangeHandler(newStauts: editDoneStatus) {
    const res = await axios.patch<todoBody>('/api/todo/edit/done', newStauts);
    if (res.status === 200) {
      if (res.data.dueDate) {
        updateAllTasks(todo, {
          ...res.data,
          createdAt: new Date(res.data.createdAt),
          dueDate: new Date(res.data.dueDate),
        });
      } else {
        updateAllTasks(todo, {
          ...res.data,
          createdAt: new Date(res.data.createdAt),
          dueDate: undefined,
        });
      }
    }
  }

  async function todoImpStatusChangeHandler(newStauts: editImpStatus) {
    const res = await axios.patch<todoBody>(
      '/api/todo/edit/important',
      newStauts,
    );
    if (res.status === 200) {
      if (res.data.dueDate) {
        updateAllTasks(todo, {
          ...res.data,
          createdAt: new Date(res.data.createdAt),
          dueDate: new Date(res.data.dueDate),
        });
      } else {
        updateAllTasks(todo, {
          ...res.data,
          createdAt: new Date(res.data.createdAt),
          dueDate: undefined,
        });
      }
    }
  }
  function checkBoxChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.checked) {
      todoDoneStatusChangeHandler({ todoId: todo.id, done: false });
    }
  }
  function impStatusChangeHandler() {
    todoImpStatusChangeHandler({ todoId: todo.id, important: !todo.important });
  }
  return (
    <div className={Styles.container}>
      <Checkbox onChange={checkBoxChangeHandler} checked={todo.done} />
      <div className={Styles.textContainer}>
        <div className={Styles.text}>{todo.todoTitle}</div>
        {todo.myDay && from !== todoFrom.MYDAY ? (
          <span className={Styles.myday}>
            <FontAwesomeIcon icon={faSun} style={{ paddingRight: '5px' }} />
            My Day
          </span>
        ) : (
          ''
        )}
        {todo.dueDate && from !== todoFrom.PLANNED ? (
          <Daydisplay date={todo.dueDate} completed={todo.done} />
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

export default CompletedTaskItem;
