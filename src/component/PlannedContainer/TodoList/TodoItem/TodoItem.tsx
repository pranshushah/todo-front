import React from 'react';
import axios from 'axios';
import { useSetTasks } from '../../../../utils/TaskListUpdater/useSetTask';
import { ImpTasksState } from '../../../../atoms/ImportantTaskAtom';
import { myDayState } from '../../../../atoms/MyDayTaskAtom';
import { normalTasksState } from '../../../../atoms/NormalTaskAtom';
import { planbedTasksState } from '../../../../atoms/plannedTasksState';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faSun } from '@fortawesome/free-regular-svg-icons';
import { faStar as SolidStar } from '@fortawesome/free-solid-svg-icons';
import {
  op,
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
  const updateNormaTasks = useSetTasks(normalTasksState);
  const updatePlannedTasks = useSetTasks(planbedTasksState);
  const updateImpTasks = useSetTasks(ImpTasksState);
  const updateMyDayTasks = useSetTasks(myDayState);
  function updateAllTasks(newTodo: plannedTodoType) {
    updateNormaTasks(newTodo, op.UPDATE);
    updatePlannedTasks(newTodo, op.UPDATE);
    if (!todo.important && newTodo.important) {
      updateImpTasks(newTodo, op.ADD);
    }
    if (todo.important && !newTodo.important) {
      updateImpTasks(newTodo, op.Del);
    }
    if (todo.important && newTodo.important) {
      updateImpTasks(newTodo, op.UPDATE);
    }
    if (todo.myDay) {
      // already checked for undefined
      //@ts-ignore
      updateMyDayTasks(newTodo, op.UPDATE);
    }
  }

  async function todoDoneStatusChangeHandler(newStauts: editDoneStatus) {
    const res = await axios.patch<plannedTodoBodyType>(
      '/api/todo/edit/done',
      newStauts,
    );
    if (res.status === 200) {
      updateAllTasks({
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
      updateAllTasks({
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
