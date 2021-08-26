import React from 'react';
import axios from '../../axios';
import { useSetAllTask } from '../../utils/customHooks/useSetAllTask';
import {
  todoType,
  todoBody,
  myDayTodoType,
  plannedTodoType,
  editDoneStatus,
  editImpStatus,
  TodoFrom,
} from '../../utils/types';
import Styles from './TaskItem.module.scss';
import Checkbox from '../UI/CheckBox/CheckBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as SolidStar, faSun } from '@fortawesome/free-solid-svg-icons';
import Daydisplay from '../Daydisplay/Daydisplay';
import { useSetRecoilState } from 'recoil';
import { selectedTodo } from '../../atoms/selectedTodoAtom';
import StepDetails from '../StepDetails/StepDetails';
import Tooltip from '../UI/Tooltip/Tooltip';
import { useSetNotification } from '../../utils/customHooks/useAddNotification';
import { useRecoilValue } from 'recoil';
import { projects } from '../../atoms/allProjectAtom';
import { timeMessageObjCreate } from '../../utils/helperFunction/timeoutMessage';

type taskItemProps = {
  todo: todoType | myDayTodoType | plannedTodoType;
  from?: TodoFrom;
};

function TaskItem({ todo, from }: taskItemProps) {
  const setSelctedTodo = useSetRecoilState(selectedTodo);
  const { addNotification } = useSetNotification();
  const updateAllTasks = useSetAllTask();
  const givenProject = useRecoilValue(projects).find(
    (project) => project.id === todo.projectId,
  );

  function updateTodoDoneStatusBeforeSendingToDatabase(
    newStauts: editDoneStatus,
  ) {
    updateAllTasks(todo, {
      ...todo,
      done: newStauts.done,
    });
  }

  function updateTodoImpStatusBeforeSendingToDatabase(
    newStauts: editImpStatus,
  ) {
    updateAllTasks(todo, {
      ...todo,
      important: newStauts.important,
    });
  }

  async function todoDoneStatusChangeHandler(newStauts: editDoneStatus) {
    const oldTodo = { ...todo };
    updateTodoDoneStatusBeforeSendingToDatabase(newStauts);
    try {
      if (window.navigator.onLine) {
        const res = await axios.patch<todoBody>(
          '/api/todo/edit/done',
          newStauts,
          timeMessageObjCreate('We were unable to update todo'),
        );
        if (res.status !== 200) {
          updateAllTasks(todo, oldTodo);
        }
      } else {
        throw new Error('there is no internet connection');
      }
    } catch (e) {
      addNotification(e.message, 'Newtowork Error');
    }
  }

  async function todoImpStatusChangeHandler(newStauts: editImpStatus) {
    const oldTodo = { ...todo };
    updateTodoImpStatusBeforeSendingToDatabase(newStauts);
    try {
      if (window.navigator.onLine) {
        const res = await axios.patch<todoBody>(
          '/api/todo/edit/important',
          newStauts,
          timeMessageObjCreate('We were unable to update todo'),
        );
        if (res.status !== 200) {
          updateAllTasks(todo, oldTodo);
        }
      } else {
        throw new Error('there is no internet connection');
      }
    } catch (e) {
      addNotification(e.message, 'Newtowork Error');
    }
  }

  function checkBoxChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    todoDoneStatusChangeHandler({ todoId: todo.id, done: e.target.checked });
  }

  function impStatusChangeHandler() {
    todoImpStatusChangeHandler({ todoId: todo.id, important: !todo.important });
  }
  function taskSelectedHandler() {
    setSelctedTodo(todo);
  }
  return (
    <div className={Styles.container}>
      <div className={Styles.checkboxContainer}>
        <Tooltip
          render={todo.done ? 'Mark as not completed' : 'Mark as completed'}
        >
          <Checkbox onChange={checkBoxChangeHandler} checked={todo.done} />
        </Tooltip>
      </div>
      <div className={Styles.textContainer} onClick={taskSelectedHandler}>
        <div
          className={todo.done ? Styles.doneText : Styles.text}
          style={
            (todo.myDay && from !== 'MY_DAY') ||
            (todo.dueDate && from !== 'PLANNED')
              ? { lineHeight: '18px' }
              : undefined
          }
        >
          {todo.todoTitle}
        </div>
        <div>
          {from === 'PROJECT' || from === 'TASK' ? (
            ''
          ) : (
            <span className={Styles.fromTaskOrProject}>
              {todo.normalTask ? 'Tasks' : givenProject?.projectName}
            </span>
          )}
          {todo.myDay && from !== 'MY_DAY' ? (
            <span className={Styles.myday}>
              <FontAwesomeIcon icon={faSun} style={{ marginRight: '4px' }} />
              My Day
            </span>
          ) : (
            ''
          )}
          <StepDetails steps={todo.steps} />
          {todo.dueDate && from !== 'PLANNED' ? (
            <Daydisplay date={todo.dueDate} completed={todo.done} />
          ) : (
            ''
          )}
        </div>
      </div>
      {todo.important ? (
        <FontAwesomeIcon
          icon={SolidStar}
          className={Styles.impFilled}
          onClick={impStatusChangeHandler}
        />
      ) : (
        <FontAwesomeIcon
          icon={faStar}
          className={Styles.imp}
          onClick={impStatusChangeHandler}
        />
      )}
    </div>
  );
}

export default TaskItem;
