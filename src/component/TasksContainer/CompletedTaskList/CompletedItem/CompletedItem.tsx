import React from 'react';
import axios from 'axios';
import { normalTasksState } from '../../../../atoms/NormalTaskAtom';
import { useSetRecoilState } from 'recoil';
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
  const setTodoList = useSetRecoilState(normalTasksState);

  async function todoDoneStatusChangeHandler(newStauts: editDoneStatus) {
    const res = await axios.patch<todoBody>('/api/todo/edit/done', newStauts);
    if (res.status === 200) {
      const newTodo: todoType = {
        ...res.data,
        createdAt: new Date(res.data.createdAt),
      };
      setTodoList((todoList) => {
        const newTodoList = [...todoList];
        const replaceIndex = newTodoList.findIndex(
          (todo) => todo.id === newTodo.id,
        );
        if (replaceIndex !== -1) {
          newTodoList[replaceIndex] = newTodo;
        }
        return newTodoList;
      });
    }
  }

  async function todoImpStatusChangeHandler(newStauts: editImpStatus) {
    const res = await axios.patch<todoBody>(
      '/api/todo/edit/important',
      newStauts,
    );
    if (res.status === 200) {
      const newTodo: todoType = {
        ...res.data,
        createdAt: new Date(res.data.createdAt),
      };
      setTodoList((todoList) => {
        const newTodoList = [...todoList];
        const replaceIndex = newTodoList.findIndex(
          (todo) => todo.id === newTodo.id,
        );
        if (replaceIndex !== -1) {
          newTodoList[replaceIndex] = newTodo;
        }
        return newTodoList;
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
