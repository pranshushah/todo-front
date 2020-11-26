import React from 'react';
import AddTodo from '../AddTodo/AddTodo';
import Header from '../UI/Header/Header';
import Styles from './TaskContainer.module.scss';
import { todoBody, op, taskStatus } from '../../utils/types';
import axios from 'axios';
import { normalTasksState } from '../../atoms/NormalTaskAtom';
import { useSetTasks } from '../../utils/customHooks/useSetTask';
import Todo from '../Todo/Todo';
import { selctedTodo } from '../../selector/selectedTodoStatus';
import { useRecoilValue } from 'recoil';
import { useSetNotification } from '../../utils/customHooks/useAddNotification';
import { normalTasksMapper } from '../../selector/normalTasksMapper';
import TaskItem from '../TaskItem/TaskItem';
import Accordion from '../UI/Accordion/Accordion';

function TaskContainer() {
  const todoStatus = useRecoilValue(selctedTodo);
  const setTodoList = useSetTasks(normalTasksState);
  const { addNotification } = useSetNotification();
  const inCompletedTodoList = useRecoilValue(
    normalTasksMapper(taskStatus.inCompleted),
  );
  const completedTodoList = useRecoilValue(
    normalTasksMapper(taskStatus.completed),
  );

  const completedTaskList = completedTodoList.map((task) => (
    <TaskItem todo={task} key={task.id} />
  ));

  const inCompletedTaskList = inCompletedTodoList.map((todo) => {
    return <TaskItem todo={todo} key={todo.id} />;
  });

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
      <section className={Styles.container}>
        <header>
          <Header displayTitle='Tasks' />
          <AddTodo onAddTodo={addTodoHandler} placeholder='Add a Task' />
        </header>
        <main>
          <div>{inCompletedTaskList}</div>
          <Accordion title='Completed Tasks' content={completedTaskList} />
        </main>
      </section>
      {todoStatus ? <Todo /> : null}
    </>
  );
}

export default TaskContainer;
