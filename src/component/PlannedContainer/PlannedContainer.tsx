import React from 'react';
import Styles from './PlannedContainer.module.scss';
import Header from '../UI/Header/Header';
import axios from 'axios';
import AddTodo from '../AddTodo/AddTodo';
import { plannedTodoBodyType } from '../../utils/types';
import TodoList from './TodoList/TododList';
import { endOfToday } from 'date-fns';
import { useRecoilValue } from 'recoil';
import { selectedTodo } from '../../atoms/selectedTodoAtom';
import Todo from '../Todo/Todo';
import { useSetNotification } from '../../utils/customHooks/useAddNotification';
import { timeMessageObjCreate } from '../../utils/helperFunction/timeoutMessage';
import { useSetAddTaskInFront } from '../../utils/customHooks/useSetAddTasksInFront';

function PlannedContainer() {
  const { addNotification } = useSetNotification();
  const todoStatus = useRecoilValue(selectedTodo);
  const addTaskInFront = useSetAddTaskInFront();

  async function addTodoHandler(todoTitle: string) {
    try {
      if (window.navigator.onLine) {
        const res = await axios.post<plannedTodoBodyType>(
          '/api/todo/new',
          {
            todoTitle,
            dueDate: endOfToday(),
          },
          timeMessageObjCreate('We were unable to add todo'),
        );
        if (res.status === 200) {
          const newData = {
            ...res.data,
            createdAt: new Date(res.data.createdAt),
            dueDate: new Date(res.data.dueDate),
          };
          addTaskInFront(newData);
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
