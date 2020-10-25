import React, { useEffect, useState } from 'react';
import AddTodo from './AddTodo/AddTodo';
import TodoList from './TaskList/TaskList';
import Styles from './TaskContainer.module.scss';
import {
  todoType,
  todoBody,
  editDoneStatus,
  editImpStatus,
} from '../../utils/types/userInfo';
import axios from 'axios';

function TaskContainer() {
  const [todoList, setTodoList] = useState<todoType[]>([]);
  useEffect(() => {
    async function getTodos() {
      const res = await axios.get<todoBody[]>('/api/todo/getalltask');
      if (res.status === 200) {
        const newTodoList: todoType[] = res.data.map((todo) => {
          return { ...todo, createdAt: new Date(todo.createdAt) };
        });
        const sortedTodoList = newTodoList.sort((a, b) => {
          return b.createdAt.getTime() - a.createdAt.getTime();
        });
        setTodoList(sortedTodoList);
      }
    }
    getTodos();
  }, []);

  function addTodoToList(todo: todoType) {
    setTodoList((todoList) => {
      const newTodoList = [...todoList];
      newTodoList.splice(0, 0, todo);
      return newTodoList;
    });
  }

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

  const inCompleteTasks = todoList.filter((todo) => {
    return todo.done === false;
  });

  const completeTasks = todoList.filter((todo) => {
    return todo.done;
  });

  console.log(completeTasks);

  return (
    <div className={Styles.container}>
      <h1 className={Styles.headingHeader}>Tasks</h1>
      <AddTodo onAddTodo={addTodoToList} />
      <TodoList
        todoList={inCompleteTasks}
        onTodoDoneStatusChange={todoDoneStatusChangeHandler}
        onTodoImpStatusChange={todoImpStatusChangeHandler}
      />
    </div>
  );
}

export default TaskContainer;
