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
import Todo from '../Todo/Todo';
import { selctedTodo } from '../../selector/selectedTodoStatus';
import { useRecoilValue } from 'recoil';
import { useSetNotification } from '../../utils/TaskListUpdater/useAddNotification';

function TaskContainer() {
  const todoStatus = useRecoilValue(selctedTodo);
  const setTodoList = useSetTasks(normalTasksState);
  const { addNotification } = useSetNotification();
  async function addTodoHandler(todoTitle: string) {
    try {
      if (window.navigator.onLine) {
        const res = await axios.post<todoBody>(
          '/api/todo/new',
          {
            todoTitle,
          },
          { timeout: 9000, timeoutErrorMessage: 'We were unable to add todo' },
        );
        if (res.status === 200) {
          const newTodo = {
            ...res.data,
            createdAt: new Date(res.data.createdAt),
            dueDate: undefined,
          };
          setTodoList(newTodo, op.ADD);
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
      <div className={Styles.container}>
        <Header title='Tasks' />
        <AddTodo onAddTodo={addTodoHandler} placeholder='Add a Task' />
        <TodoList />
        <CompletedTaskList />
      </div>
      {todoStatus ? <Todo /> : null}
    </>
  );
}

export default TaskContainer;
