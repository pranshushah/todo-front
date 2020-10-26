import React from 'react';
import axios from 'axios';
import { useSetUpdateNormalTasks } from '../../../../utils/TaskListUpdater/updateNormalTasks';
import { useSetUpdatePlannedTasks } from '../../../../utils/TaskListUpdater/useSetUpdatePlannedTasks';
import {
  todoType,
  todoBody,
  editDoneStatus,
  editImpStatus,
} from '../../../../utils/types/userInfo';
import Styles from './CompletedItem.module.scss';
import Checkbox from '../../../UI/CheckBox/CheckBox';
type taskItemProps = {
  todo: todoType;
};

function CompletedTaskItem({ todo }: taskItemProps) {
  const updateNormaTasks = useSetUpdateNormalTasks();
  const updatePlannedTasks = useSetUpdatePlannedTasks();

  function updateAllTasks(newTodo: todoType) {
    updateNormaTasks(newTodo);
    if (newTodo.dueDate) {
      newTodo = { ...newTodo, dueDate: new Date(newTodo.dueDate) };
      // already checked for undefined
      //@ts-ignore
      updatePlannedTasks(newTodo);
    }
  }

  async function todoDoneStatusChangeHandler(newStauts: editDoneStatus) {
    const res = await axios.patch<todoBody>('/api/todo/edit/done', newStauts);
    if (res.status === 200) {
      updateAllTasks({
        ...res.data,
        createdAt: new Date(res.data.createdAt),
      });
    }
  }

  async function todoImpStatusChangeHandler(newStauts: editImpStatus) {
    const res = await axios.patch<todoBody>(
      '/api/todo/edit/important',
      newStauts,
    );
    if (res.status === 200) {
      updateAllTasks({
        ...res.data,
        createdAt: new Date(res.data.createdAt),
      });
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

export default CompletedTaskItem;
