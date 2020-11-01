import React from 'react';
import AddTodo from '../AddTodo/AddTodo';
import Header from '../UI/Header/Header';
import axios from 'axios';
import { todoBody, op } from '../../utils/types';
import Styles from './ImportantContainer.module.scss';
import CompletedTaskList from './CompletedTaskList/CompletedTaksList';
import TaskList from './TaskList/TaskList';
import { normalTasksState } from '../../atoms/NormalTaskAtom';
import { useSetTasks } from '../../utils/TaskListUpdater/useSetTask';
import { ImpTasksState } from '../../atoms/ImportantTaskAtom';
function Important() {
  const setNormalTodoList = useSetTasks(normalTasksState);
  const setImpTodoList = useSetTasks(ImpTasksState);

  async function addTodoHandler(todoTitle: string) {
    const res = await axios.post<todoBody>('/api/todo/new', {
      todoTitle,
      important: true,
    });
    const newTodo = {
      ...res.data,
      createdAt: new Date(res.data.createdAt),
      dueDate: undefined,
    };
    setNormalTodoList(newTodo, op.ADD);
    setImpTodoList(newTodo, op.ADD);
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
