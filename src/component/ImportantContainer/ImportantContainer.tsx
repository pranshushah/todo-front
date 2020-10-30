import React from 'react';
import AddTodo from '../AddTodo/AddTodo';
import Header from '../UI/Header/Header';
import axios from 'axios';
import { todoType, todoBody, op } from '../../utils/types/userInfo';
import Styles from './ImportantContainer.module.scss';
import { useSetUpdateNormalTasks } from '../../utils/TaskListUpdater/updateNormalTasks';
import { useSetImpTasks } from '../../utils/TaskListUpdater/useSetImpTasks';
import CompletedTaskList from './CompletedTaskList/CompletedTaksList';
import TaskList from './TaskList/TaskList';
function Important() {
  const setNormalTodoList = useSetUpdateNormalTasks();
  const setImpTodoList = useSetImpTasks();

  async function addTodoHandler(todoTitle: string) {
    const res = await axios.post<todoBody>('/api/todo/new', {
      todoTitle,
      important: true,
    });
    addTodoToList({
      ...res.data,
      createdAt: new Date(res.data.createdAt),
      dueDate: undefined,
    });
  }

  function addTodoToList(todo: todoType) {
    setNormalTodoList(todo, op.ADD);
    setImpTodoList(todo, op.ADD);
  }

  return (
    <div className={Styles.container}>
      <Header title='Important' />
      <AddTodo placeholder='Add Task' onAddTodo={addTodoHandler} />
      <TaskList />
      <CompletedTaskList />
    </div>
  );
}

export default Important;
