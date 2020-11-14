import React from 'react';
import axios from 'axios';
import { useSetAllTask } from '../../utils/TaskListUpdater/useSetAllTask';
import {
  todoType,
  todoBody,
  myDayTodoType,
  plannedTodoType,
  editDoneStatus,
  editImpStatus,
  todoFrom,
} from '../../utils/types';
import Styles from './TaskItem.module.scss';
import Checkbox from '../UI/CheckBox/CheckBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as SolidStar, faSun } from '@fortawesome/free-solid-svg-icons';
import Daydisplay from '../Daydisplay/Daydisplay';
import { useSetRecoilState } from 'recoil';
import { selectedTodo } from '../../atoms/selectedTodoAtom';
import StepDetails from '../StepDetails/StepDetails';
type taskItemProps = {
  todo: todoType | myDayTodoType | plannedTodoType;
  from?: todoFrom;
};

function TaskItem({ todo, from }: taskItemProps) {
  const setSelctedTodo = useSetRecoilState(selectedTodo);
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
    if (e.target.checked) {
      todoDoneStatusChangeHandler({ todoId: todo.id, done: true });
    }
  }

  function impStatusChangeHandler() {
    todoImpStatusChangeHandler({ todoId: todo.id, important: !todo.important });
  }
  function taskSelectedHandler() {
    setSelctedTodo(todo);
  }
  return (
    <div className={Styles.container}>
      <Checkbox onChange={checkBoxChangeHandler} checked={todo.done} />
      <div className={Styles.textContainer} onClick={taskSelectedHandler}>
        <div
          className={Styles.text}
          style={
            (todo.myDay && from !== todoFrom.MYDAY) ||
            (todo.dueDate && from !== todoFrom.PLANNED)
              ? { lineHeight: '18px' }
              : undefined
          }>
          {todo.todoTitle}
        </div>
        <div>
          {todo.myDay && from !== todoFrom.MYDAY ? (
            <span className={Styles.myday}>
              <FontAwesomeIcon icon={faSun} style={{ paddingRight: '5px' }} />
              My Day
            </span>
          ) : (
            ''
          )}
          <StepDetails steps={todo.steps} />
          {todo.dueDate && from !== todoFrom.PLANNED ? (
            <Daydisplay date={todo.dueDate} completed={todo.done} />
          ) : (
            ''
          )}
        </div>
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

export default TaskItem;
