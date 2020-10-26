import React from 'react';
import Styles from './PlannedContainer.module.scss';
import Header from '../UI/Header/Header';
import axios from 'axios';
import AddTodo from '../AddTodo/AddTodo';
import {
  plannedTodoType,
  plannedTodoBodyType,
} from '../../utils/types/userInfo';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { planbedTasksState } from '../../atoms/plannedTasksState';
function PlannedContainer() {
  const setTodoList = useSetRecoilState(planbedTasksState);
  const todoList = useRecoilValue(planbedTasksState);

  function addTodoToList(todo: plannedTodoType) {
    setTodoList((todoList) => {
      const newTodoList = [...todoList];
      newTodoList.splice(0, 0, todo);
      return newTodoList;
    });
  }

  async function addTodoHandler(todoTitle: string) {
    const res = await axios.post<plannedTodoBodyType>('/api/todo/new', {
      todoTitle,
      dueDate: new Date(),
    });
    console.log(res.data);
    addTodoToList({
      ...res.data,
      createdAt: new Date(res.data.createdAt),
      dueDate: new Date(res.data.dueDate),
    });
  }
  console.log(todoList);
  return (
    <div className={Styles.container}>
      <Header title='Planned' />
      <AddTodo onAddTodo={addTodoHandler} placeholder='Add a task due today' />
    </div>
  );
}

export default PlannedContainer;
