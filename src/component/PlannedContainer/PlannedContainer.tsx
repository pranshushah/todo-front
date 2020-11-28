import React from 'react';
import Styles from './PlannedContainer.module.scss';
import Header from '../UI/Header/Header';
import axios from 'axios';
import AddTodo from '../AddTodo/AddTodo';
import { normalTasksState } from '../../atoms/NormalTaskAtom';
import { useSetTasks } from '../../utils/customHooks/useSetTask';
import { op, plannedTodoBodyType } from '../../utils/types';
import { planbedTasksState } from '../../atoms/plannedTasksState';
import TodoList from './TodoList/TododList';
import { endOfToday } from 'date-fns';
import { useRecoilValue } from 'recoil';
import { selectedTodo } from '../../atoms/selectedTodoAtom';
import Todo from '../Todo/Todo';
import { useSetNotification } from '../../utils/customHooks/useAddNotification';

function PlannedContainer() {
  const { addNotification } = useSetNotification();
  const setTodoList = useSetTasks(planbedTasksState);
  const todoStatus = useRecoilValue(selectedTodo);
  const setNormalTodoList = useSetTasks(normalTasksState);

  async function addTodoHandler(todoTitle: string) {
    try {
      if (window.navigator.onLine) {
        const res = await axios.post<plannedTodoBodyType>(
          '/api/todo/new',
          {
            todoTitle,
            dueDate: endOfToday(),
          },
          { timeoutErrorMessage: 'We were unable to add todo' },
        );
        if (res.status === 200) {
          const newData = {
            ...res.data,
            createdAt: new Date(res.data.createdAt),
            dueDate: new Date(res.data.dueDate),
          };
          setTodoList(newData, op.ADD);
          setNormalTodoList(newData, op.ADD);
        }
      } else {
        throw new Error('No internet connection');
      }
    } catch (e) {
      addNotification(e.message, 'NetWork Error');
    }
  }

  return (
    <>
      <section className={Styles.container}>
        <header>
          <Header displayTitle='Planned' />
          <AddTodo
            onAddTodo={addTodoHandler}
            placeholder='Add a task due today'
          />
        </header>
        <main>
          <TodoList />
        </main>
      </section>
      {todoStatus ? <Todo /> : null}
    </>
  );
}

export default PlannedContainer;
