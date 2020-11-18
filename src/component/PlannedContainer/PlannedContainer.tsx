import React from 'react';
import Styles from './PlannedContainer.module.scss';
import Header from '../UI/Header/Header';
import axios from 'axios';
import AddTodo from '../AddTodo/AddTodo';
import { normalTasksState } from '../../atoms/NormalTaskAtom';
import { useSetTasks } from '../../utils/TaskListUpdater/useSetTask';
import { op, plannedTodoBodyType } from '../../utils/types';
import { planbedTasksState } from '../../atoms/plannedTasksState';
import TodoList from './TodoList/TododList';
import { endOfToday } from 'date-fns';
import { useRecoilValue } from 'recoil';
import { selectedTodo } from '../../atoms/selectedTodoAtom';
import Todo from '../Todo/Todo';

function PlannedContainer() {
  const setTodoList = useSetTasks(planbedTasksState);
  const todoStatus = useRecoilValue(selectedTodo);
  const setNormalTodoList = useSetTasks(normalTasksState);

  async function addTodoHandler(todoTitle: string) {
    const res = await axios.post<plannedTodoBodyType>('/api/todo/new', {
      todoTitle,
      dueDate: endOfToday(),
    });
    const newData = {
      ...res.data,
      createdAt: new Date(res.data.createdAt),
      dueDate: new Date(res.data.dueDate),
    };
    setTodoList(newData, op.ADD);
    setNormalTodoList(newData, op.ADD);
  }
  return (
    <>
      <div className={Styles.container}>
        <Header title='Planned' />
        <AddTodo
          onAddTodo={addTodoHandler}
          placeholder='Add a task due today'
        />
        <TodoList />
      </div>
      {todoStatus ? <Todo /> : null}
    </>
  );
}

export default PlannedContainer;
