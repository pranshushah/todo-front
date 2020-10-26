import React from 'react';
import AddTodo from '../AddTodo/AddTodo';
import TodoList from './TaskList/TaskList';
import Header from '../UI/Header/Header';
import Styles from './TaskContainer.module.scss';
import { todoBody, todoType } from '../../utils/types/userInfo';
import CompletedTaskList from './CompletedTaskList/CompletedTaskList';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { normalTasksState } from '../../atoms/NormalTaskAtom';

function TaskContainer() {
  const setTodoList = useSetRecoilState(normalTasksState);

  function addTodoToList(todo: todoType) {
    setTodoList((todoList) => {
      const newTodoList = [...todoList];
      newTodoList.splice(0, 0, todo);
      return newTodoList;
    });
  }

  async function addTodoHandler(todoTitle: string) {
    const res = await axios.post<todoBody>('/api/todo/new', {
      todoTitle,
    });
    addTodoToList({ ...res.data, createdAt: new Date(res.data.createdAt) });
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
