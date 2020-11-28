import React, { useState } from 'react';
import Styles from './DueDate.module.scss';
import { useRecoilValue } from 'recoil';
import DueDateMenu from './DueDateMenu/DueDateMenu';
import { selectedTodo } from '../../../atoms/selectedTodoAtom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import CloseButton from '../CloseButton/CloseButton';
import { getDateString } from '../../../utils/helperFunction/getDateString';
import axios from '../../../axios';
import { todoBody } from '../../../utils/types';
import { useSetTaskFromTaskDetails } from '../../../utils/customHooks/useUpdateTaskFromTaskDetails';
import { useSetNotification } from '../../../utils/customHooks/useAddNotification';
import { endOfToday, endOfTomorrow } from 'date-fns';

function DueDate() {
  const todo = useRecoilValue(selectedTodo);
  const [showMenu, setShowMenu] = useState(false);
  const updateTaskFromDetails = useSetTaskFromTaskDetails();
  const { addNotification } = useSetNotification();

  function CloseMenuHandler() {
    setShowMenu(false);
  }

  function openMenuHandler() {
    setShowMenu(true);
  }

  async function removeDueDayHandler() {
    if (todo) {
      try {
        if (window.navigator.onLine) {
          const res = await axios.patch<todoBody>(
            '/api/todo/delete/duedate',
            {
              todoId: todo?.id,
            },
            {
              timeoutErrorMessage: 'We were unable to update todo',
            },
          );
          if (res.status === 200) {
            updateTaskFromDetails(todo, res.data);
          }
        } else {
          throw new Error('No internet connection');
        }
      } catch (e) {
        addNotification(e.message, 'Network Error');
      }
    }
  }
  async function addTodayDayHandler() {
    if (todo) {
      try {
        if (window.navigator.onLine) {
          const res = await axios.patch<todoBody>(
            '/api/todo/edit/duedate',
            {
              todoId: todo?.id,
              dueDate: endOfToday().toString(),
            },
            {
              timeoutErrorMessage: 'We were unable to update todo',
            },
          );
          if (res.status === 200) {
            updateTaskFromDetails(todo, res.data);
          }
        } else {
          throw new Error('No internet connection');
        }
      } catch (e) {
        addNotification(e.message, 'Network Error');
      }
    }
  }
  async function addTommorrowDayHandler() {
    if (todo) {
      try {
        if (window.navigator.onLine) {
          const res = await axios.patch<todoBody>(
            '/api/todo/edit/duedate',
            {
              todoId: todo?.id,
              dueDate: endOfTomorrow().toString(),
            },
            {
              timeoutErrorMessage: 'We were unable to update todo',
            },
          );
          if (res.status === 200) {
            updateTaskFromDetails(todo, res.data);
          }
        } else {
          throw new Error('No internet connection');
        }
      } catch (e) {
        addNotification(e.message, 'Network Error');
      }
    }
  }

  return (
    <div className={Styles.container} onClick={openMenuHandler}>
      <DueDateMenu
        show={showMenu}
        onClickOutside={CloseMenuHandler}
        onAddTommorrowClick={addTommorrowDayHandler}
        onAddTodayClick={addTodayDayHandler}
      />
      <div className={Styles.textContainer}>
        <FontAwesomeIcon icon={faCalendar} />
        <span
          className={
            todo?.dueDate
              ? [Styles.text, Styles.activeText].join(' ')
              : Styles.text
          }
        >
          {todo?.dueDate ? getDateString(todo.dueDate) : 'Add due date'}
        </span>
        <span></span>
      </div>
      {todo?.dueDate ? (
        <div className={Styles.buttonContainer}>
          <CloseButton onClick={removeDueDayHandler} />
        </div>
      ) : null}
    </div>
  );
}

export default DueDate;
