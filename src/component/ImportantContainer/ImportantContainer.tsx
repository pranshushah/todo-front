import React from 'react';
import AddTodo from '../AddTodo/AddTodo';
import Header from '../UI/Header/Header';
import axios from 'axios';
import { todoBody, op, taskStatus } from '../../utils/types';
import Styles from './ImportantContainer.module.scss';
import { normalTasksState } from '../../atoms/NormalTaskAtom';
import { useSetTasks } from '../../utils/customHooks/useSetTask';
import { ImpTasksState } from '../../atoms/ImportantTaskAtom';
import { useRecoilValue } from 'recoil';
import { selectedTodo } from '../../atoms/selectedTodoAtom';
import Todo from '../Todo/Todo';
import { useSetNotification } from '../../utils/customHooks/useAddNotification';
import { impTasksMapper } from '../../selector/impTasksMapper';
import TaskItem from '../TaskItem/TaskItem';
import Accordion from '../UI/Accordion/Accordion';
import { timeMessageObjCreate } from '../../utils/helperFunction/timeoutMessage';

function Important() {
  const { addNotification } = useSetNotification();
  const setNormalTodoList = useSetTasks(normalTasksState);
  const setImpTodoList = useSetTasks(ImpTasksState);
  const todoStatus = useRecoilValue(selectedTodo);
  const completedTodoList = useRecoilValue(
    impTasksMapper(taskStatus.completed),
  );
  const completedTaskList = completedTodoList.map((task) => (
    <TaskItem todo={task} key={task.id} />
  ));

  const inCompleteTodoList = useRecoilValue(
    impTasksMapper(taskStatus.inCompleted),
  );
  const inCompleteTaskList = inCompleteTodoList.map((task, index) => (
    <TaskItem todo={task} key={index} />
  ));

  async function addTodoHandler(todoTitle: string) {
    try {
      if (window.navigator.onLine) {
        const res = await axios.post<todoBody>(
          '/api/todo/new',
          {
            todoTitle,
            important: true,
          },
          timeMessageObjCreate('We were unable to add todo'),
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
          <Header displayTitle='Important' />
          <AddTodo placeholder='Add Task' onAddTodo={addTodoHandler} />
        </header>
        <main>
          <div>{inCompleteTaskList}</div>
          <Accordion
            title='Completed Important Tasks'
            content={completedTaskList}
          />
        </main>
      </section>
      {todoStatus ? <Todo /> : null}
    </>
  );
}

export default Important;
