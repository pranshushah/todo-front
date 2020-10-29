import React from 'react';
import axios from 'axios';
import { useSetUpdateNormalTasks } from '../../../../utils/TaskListUpdater/updateNormalTasks';
import { useSetUpdatePlannedTasks } from '../../../../utils/TaskListUpdater/useSetUpdatePlannedTasks';
import { useSetImpTasks } from '../../../../utils/TaskListUpdater/useSetImpTasks';
import {
  todoType,
  todoBody,
  op,
  editDoneStatus,
  editImpStatus,
} from '../../../../utils/types/userInfo';
import Styles from './TaskItem.module.scss';
import Checkbox from '../../../UI/CheckBox/CheckBox';
type taskItemProps = {
  todo: todoType;
};

function TaskItem({ todo }: taskItemProps) {
  const updateNormaTasks = useSetUpdateNormalTasks();
  const updatePlannedTasks = useSetUpdatePlannedTasks();
  const updateImpTasks = useSetImpTasks();
  function updateAllTasks(newTodo: todoType) {
    updateNormaTasks(newTodo, op.UPDATE);
    if (newTodo.dueDate) {
      newTodo = { ...newTodo, dueDate: new Date(newTodo.dueDate) };
      // already checked for undefined
      //@ts-ignore
      updatePlannedTasks(newTodo, op.UPDATE);
    }
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
    const res = await axios.patch<todoBody>('/api/todo/edit/done', newStauts);
    if (res.status === 200) {
      if (res.data.dueDate) {
        updateAllTasks({
          ...res.data,
          createdAt: new Date(res.data.createdAt),
          dueDate: new Date(res.data.dueDate),
        });
      } else {
        updateAllTasks({
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
        updateAllTasks({
          ...res.data,
          createdAt: new Date(res.data.createdAt),
          dueDate: new Date(res.data.dueDate),
        });
      } else {
        updateAllTasks({
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
  return (
    <div className={Styles.container}>
      <Checkbox onChange={checkBoxChangeHandler} checked={todo.done} />
      <div className={Styles.text}>{todo.todoTitle}</div>
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

export default TaskItem;
