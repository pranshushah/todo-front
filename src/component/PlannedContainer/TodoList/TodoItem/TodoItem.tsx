import React from 'react';
import axios from 'axios';
import { useSetUpdateNormalTasks } from '../../../../utils/TaskListUpdater/updateNormalTasks';
import { useSetUpdatePlannedTasks } from '../../../../utils/TaskListUpdater/useSetUpdatePlannedTasks';
import { useSetImpTasks } from '../../../../utils/TaskListUpdater/useSetImpTasks';
import {
  op,
  plannedTodoType,
  plannedTodoBodyType,
  editDoneStatus,
  editImpStatus,
} from '../../../../utils/types/userInfo';
import Styles from './TodoItem.module.scss';
import Checkbox from '../../../UI/CheckBox/CheckBox';
type TodoItemProps = {
  todo: plannedTodoType;
};

function TodoITem({ todo }: TodoItemProps) {
  const updateNormaTasks = useSetUpdateNormalTasks();
  const updatePlannedTasks = useSetUpdatePlannedTasks();
  const updateImpTasks = useSetImpTasks();
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
      <div
        className={
          todo.done ? [Styles.text, Styles.doneText].join(' ') : Styles.text
        }>
        {todo.todoTitle}
      </div>
      <i
        onClick={impStatusChangeHandler}
        className={
          todo.important
            ? ['fa', 'fa-star', Styles.impFilled].join(' ')
            : ['fa', 'fa-star-o', Styles.imp].join(' ')
        }
      />
    </div>
  );
}

export default TodoITem;
