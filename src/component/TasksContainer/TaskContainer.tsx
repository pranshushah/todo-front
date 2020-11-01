import React from 'react';
import AddTodo from '../AddTodo/AddTodo';
import TodoList from './TaskList/TaskList';
import Header from '../UI/Header/Header';
import Styles from './TaskContainer.module.scss';
import { todoBody, op } from '../../utils/types';
import CompletedTaskList from './CompletedTaskList/CompletedTaskList';
import axios from 'axios';
import { normalTasksState } from '../../atoms/NormalTaskAtom';
import { useSetTasks } from '../../utils/TaskListUpdater/useSetTask';
function TaskContainer() {
  const setTodoList = useSetTasks(normalTasksState);

  async function addTodoHandler(todoTitle: string) {
    const res = await axios.post<todoBody>('/api/todo/new', {
      todoTitle,
    });
    setTodoList(
      {
        ...res.data,
        createdAt: new Date(res.data.createdAt),
        dueDate: undefined,
      },
      op.ADD,
    );
  }
  return (
    <div className={Styles.container}>
      <Header title='Tasks' />
      <AddTodo onAddTodo={addTodoHandler} placeholder='Add a Task' />
      <TodoList />
      <CompletedTaskList />
      <div className={Styles.bg} />
    </div>
  );
}

export default TaskContainer;
