import React from 'react';
import Styles from './MyDayContainer.module.scss';
import Header from '../UI/Header/Header';
import axios from 'axios';
import AddTodo from '../AddTodo/AddTodo';
import { MydayTodoBodyType, op } from '../../utils/types/userInfo';
import TodoList from './TodoList/TodoList';
import { useSetUpdateNormalTasks } from '../../utils/TaskListUpdater/updateNormalTasks';
import { useSetMydayTasks } from '../../utils/TaskListUpdater/useSetMydayTasks';
import CompletedList from './CompletedList/CompletedTask';

function MydayContainer() {
  const setNormalTodoList = useSetUpdateNormalTasks();
  const setMydayTodoList = useSetMydayTasks();

  async function addTodoHandler(todoTitle: string) {
    const res = await axios.post<MydayTodoBodyType>('/api/todo/new', {
      todoTitle,
      myDay: true,
    });
    const newTodo = {
      ...res.data,
      createdAt: new Date(res.data.createdAt),
      dueDate: undefined,
    };
    setMydayTodoList(newTodo, op.ADD);
    setNormalTodoList(newTodo, op.ADD);
  }

  return (
    <div className={Styles.container}>
      <Header title='My Day' />
      <AddTodo onAddTodo={addTodoHandler} placeholder='Add a Myday Task' />
      <TodoList />
      <CompletedList />
    </div>
  );
}

export default MydayContainer;
