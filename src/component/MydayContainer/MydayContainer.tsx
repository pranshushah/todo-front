import React from 'react';
import Styles from './MyDayContainer.module.scss';
import Header from '../UI/Header/Header';
import axios from '../../axios';
import AddTodo from '../AddTodo/AddTodo';
import { MydayTodoBodyType, todoFrom, taskStatus } from '../../utils/types';
import { useRecoilValue } from 'recoil';
import { selectedTodo } from '../../atoms/selectedTodoAtom';
import Todo from '../Todo/Todo';
import { useSetNotification } from '../../utils/customHooks/useAddNotification';
import { myDayTaskMapper } from '../../selector/myDayTaskMapper';
import TaskItem from '../TaskItem/TaskItem';
import Accordion from '../UI/Accordion/Accordion';
import { timeMessageObjCreate } from '../../utils/helperFunction/timeoutMessage';
import { useSetAddTaskInFront } from '../../utils/customHooks/useSetAddTasksInFront';

function MydayContainer() {
  const { addNotification } = useSetNotification();
  const addTaskInFront = useSetAddTaskInFront();
  const todoStatus = useRecoilValue(selectedTodo);

  const completedTodoList = useRecoilValue(
    myDayTaskMapper(taskStatus.completed),
  );
  const completedTaskList = completedTodoList.map((task) => (
    <TaskItem todo={task} key={task.id} from={todoFrom.MYDAY} />
  ));

  const inCompleteTodoList = useRecoilValue(
    myDayTaskMapper(taskStatus.inCompleted),
  );
  const inCompleteTaskList = inCompleteTodoList.map((task) => (
    <TaskItem todo={task} key={task.id} from={todoFrom.MYDAY} />
  ));

  async function addTodoHandler(todoTitle: string) {
    try {
      if (window.navigator.onLine) {
        const res = await axios.post<MydayTodoBodyType>(
          '/api/todo/new',
          {
            todoTitle,
            myDay: true,
          },
          timeMessageObjCreate('We were unable to add todo'),
        );
        if (res.status === 200) {
          const newTodo = {
            ...res.data,
            createdAt: new Date(res.data.createdAt),
            dueDate: undefined,
          };
          addTaskInFront(newTodo);
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
          <Header displayTitle='My Day' />
          <AddTodo onAddTodo={addTodoHandler} placeholder='Add a Myday Task' />
        </header>
        <main>
          <div>{inCompleteTaskList}</div>
          <Accordion title='Completed Tasks'>{completedTaskList}</Accordion>
        </main>
      </section>
      {todoStatus ? <Todo /> : null}
    </>
  );
}

export default MydayContainer;
