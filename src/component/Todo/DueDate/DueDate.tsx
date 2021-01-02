import React from 'react';
import Styles from './DueDate.module.scss';
import { useRecoilValue } from 'recoil';
import { selectedTodo } from '../../../atoms/selectedTodoAtom';
import CloseButton from '../CloseButton/CloseButton';
import { getDateString } from '../../../utils/helperFunction/getDateString';
import axios from '../../../axios';
import { todoBody } from '../../../utils/types';
import { useSetTaskFromTaskDetails } from '../../../utils/customHooks/useUpdateTaskFromTaskDetails';
import { useSetNotification } from '../../../utils/customHooks/useAddNotification';
import { endOfDay } from 'date-fns';
import DueDatePicker from '../AddDueDate/AddDueDate';
import { timeMessageObjCreate } from '../../../utils/helperFunction/timeoutMessage';

function DueDate() {
  const todo = useRecoilValue(selectedTodo);
  const updateTaskFromDetails = useSetTaskFromTaskDetails();
  const { addNotification } = useSetNotification();

  async function removeDueDayHandler() {
    if (todo) {
      const oldTodo = { ...todo };
      updateTaskFromDetails(todo, { ...todo, dueDate: undefined });
      try {
        if (window.navigator.onLine) {
          const res = await axios.patch<todoBody>(
            '/api/todo/delete/duedate',
            {
              todoId: todo?.id,
            },
            timeMessageObjCreate('We were unable to update todo'),
          );
          if (res.status !== 200) {
            updateTaskFromDetails(todo, oldTodo);
          }
        } else {
          throw new Error('No internet connection');
        }
      } catch (e) {
        addNotification(e.message, 'Network Error');
      }
    }
  }
  async function dateChangeHandler(date: Date) {
    if (todo) {
      const oldTodo = { ...todo };
      updateTaskFromDetails(todo, { ...todo, dueDate: endOfDay(date) });
      try {
        if (window.navigator.onLine) {
          const res = await axios.patch<todoBody>(
            '/api/todo/edit/duedate',
            {
              todoId: todo?.id,
              dueDate: endOfDay(date).toString(),
            },
            timeMessageObjCreate('We were unable to update todo'),
          );
          if (res.status !== 200) {
            updateTaskFromDetails(todo, oldTodo);
          }
        } else {
          throw new Error('No internet connection');
        }
      } catch (e) {
        addNotification(e.message, 'Network Error');
      }
    }
  }

  return todo?.dueDate ? (
    <div className={Styles.container}>
      <div className={Styles.textContainer}>
        <span className={[Styles.text, Styles.activeText].join(' ')}>
          {getDateString(todo.dueDate)}
        </span>
      </div>
      <div className={Styles.buttonContainer}>
        <CloseButton onClick={removeDueDayHandler} />
      </div>
    </div>
  ) : (
    <div className={Styles.dateContainer}>
      <DueDatePicker changeHandler={dateChangeHandler} />
    </div>
  );
}

export default DueDate;
