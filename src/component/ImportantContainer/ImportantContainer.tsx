import React from 'react';
import AddTodo from '../AddTodo/AddTodo';
import Header from '../UI/Header/Header';
import axios from 'axios';
import { todoBody, op } from '../../utils/types';
import Styles from './ImportantContainer.module.scss';
import CompletedTaskList from './CompletedTaskList/CompletedTaksList';
import TaskList from './TaskList/TaskList';
import { normalTasksState } from '../../atoms/NormalTaskAtom';
import { useSetTasks } from '../../utils/customHooks/useSetTask';
import { ImpTasksState } from '../../atoms/ImportantTaskAtom';
import { useRecoilValue } from 'recoil';
import { selectedTodo } from '../../atoms/selectedTodoAtom';
import Todo from '../Todo/Todo';
import { useSetNotification } from '../../utils/customHooks/useAddNotification';
function Important() {
  const { addNotification } = useSetNotification();
  const setNormalTodoList = useSetTasks(normalTasksState);
  const setImpTodoList = useSetTasks(ImpTasksState);
  const todoStatus = useRecoilValue(selectedTodo);

  async function addTodoHandler(todoTitle: string) {
    try {
      if (window.navigator.onLine) {
        const res = await axios.post<todoBody>(
          '/api/todo/new',
          {
            todoTitle,
            important: true,
          },
          { timeout: 9000, timeoutErrorMessage: 'We were unable to add todo' },
        );
        if (res.status === 200) {
          const newTodo = {
            ...res.data,
            createdAt: new Date(res.data.createdAt),
            dueDate: undefined,
          };
          setNormalTodoList(newTodo, op.ADD);
          setImpTodoList(newTodo, op.ADD);
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
          <Header title='Important' />
          <AddTodo placeholder='Add Task' onAddTodo={addTodoHandler} />
        </header>
        <main>
          <TaskList />
          <CompletedTaskList />
        </main>
      </section>
      {todoStatus ? <Todo /> : null}
    </>
  );
}

export default Important;
