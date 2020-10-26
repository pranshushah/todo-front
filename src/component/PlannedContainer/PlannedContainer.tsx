import React from 'react';
import Styles from './PlannedContainer.module.scss';
import Header from '../UI/Header/Header';
import axios from 'axios';
import AddTodo from '../AddTodo/AddTodo';
import {
  plannedTodoType,
  plannedTodoBodyType,
} from '../../utils/types/userInfo';
import { useSetRecoilState } from 'recoil';
import { planbedTasksState } from '../../atoms/plannedTasksState';
import { normalTasksState } from '../../atoms/NormalTaskAtom';
import TodoList from './TodoList/TododList';

function PlannedContainer() {
  const setTodoList = useSetRecoilState(planbedTasksState);
  const setNormalTodoList = useSetRecoilState(normalTasksState);

  function addTodoToList(todo: plannedTodoType) {
    setTodoList((todoList) => {
      const newTodoList = [...todoList];
      newTodoList.splice(0, 0, todo);
      return newTodoList;
    });
    setNormalTodoList((todoList) => {
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
  return (
    <div className={Styles.container}>
      <Header title='Planned' />
      <AddTodo onAddTodo={addTodoHandler} placeholder='Add a task due today' />
      <TodoList />
    </div>
  );
}

export default PlannedContainer;
