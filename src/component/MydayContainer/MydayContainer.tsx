import React from 'react';
import Styles from './MyDayContainer.module.scss';
import Header from '../UI/Header/Header';
import axios from 'axios';
import AddTodo from '../AddTodo/AddTodo';
import { MydayTodoBodyType, op } from '../../utils/types';
import TodoList from './TodoList/TodoList';
import CompletedList from './CompletedList/CompletedTask';
import { normalTasksState } from '../../atoms/NormalTaskAtom';
import { useSetTasks } from '../../utils/TaskListUpdater/useSetTask';
import { myDayState } from '../../atoms/MyDayTaskAtom';
import { useRecoilValue } from 'recoil';
import { selectedTodo } from '../../atoms/selectedTodoAtom';
import Todo from '../Todo/Todo';
import { useSetNotification } from '../../utils/TaskListUpdater/useAddNotification';
function MydayContainer() {
  const { addNotification } = useSetNotification();
  const setNormalTodoList = useSetTasks(normalTasksState);
  const setMydayTodoList = useSetTasks(myDayState);
  const todoStatus = useRecoilValue(selectedTodo);

  async function addTodoHandler(todoTitle: string) {
    try {
      if (window.navigator.onLine) {
        const res = await axios.post<MydayTodoBodyType>(
          '/api/todo/new',
          {
            todoTitle,
            myDay: true,
          },
          { timeout: 9000, timeoutErrorMessage: 'We were unable to add todo' },
        );
        if (res.status === 200) {
          const newTodo = {
            ...res.data,
            createdAt: new Date(res.data.createdAt),
            dueDate: undefined,
          };
          setMydayTodoList(newTodo, op.ADD);
          setNormalTodoList(newTodo, op.ADD);
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
          <Header title='My Day' />
          <AddTodo onAddTodo={addTodoHandler} placeholder='Add a Myday Task' />
        </header>
        <main>
          <TodoList />
          <CompletedList />
        </main>
      </section>
      {todoStatus ? <Todo /> : null}
    </>
  );
}

export default MydayContainer;
