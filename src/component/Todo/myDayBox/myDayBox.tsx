import React from 'react';
import Styles from './myDayBox.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun } from '@fortawesome/free-solid-svg-icons';
import { useRecoilValue } from 'recoil';
import { selectedTodo } from '../../../atoms/selectedTodoAtom';
import axios from 'axios';
import { MydayTodoBodyType } from '../../../utils/types';
import CloseButton from '../CloseButton/CloseButton';
import { useSetTaskFromTaskDetails } from '../../../utils/TaskListUpdater/useUpdateTaskFromTaskDetails';

function MyDayBox() {
  const todo = useRecoilValue(selectedTodo);
  const updateTaskFromDetails = useSetTaskFromTaskDetails();
  async function AddToMyDayHandler() {
    if (!todo?.myDay && todo) {
      const res = await axios.patch<MydayTodoBodyType>('/api/todo/edit/myday', {
        todoId: todo.id,
        myDay: true,
      });
      if (res.status === 200) {
        updateTaskFromDetails(todo, res.data);
      }
    }
  }

  async function removeMyDayHandler() {
    if (todo) {
      const res = await axios.patch<MydayTodoBodyType>('/api/todo/edit/myday', {
        todoId: todo.id,
        myDay: false,
      });
      if (res.status === 200) {
        updateTaskFromDetails(todo, res.data);
      }
    }
  }

  return (
    <div className={Styles.mydayContainer}>
      <div onClick={AddToMyDayHandler} className={Styles.mydayTextContainer}>
        <FontAwesomeIcon icon={faSun} />
        <span
          className={
            todo?.myDay
              ? [Styles.mydayText, Styles.activeText].join(' ')
              : Styles.mydayText
          }>
          {todo?.myDay ? 'Added to My Day' : 'Add to My Day'}
        </span>
      </div>
      {todo?.myDay ? (
        <div className={Styles.buttonContainer}>
          <CloseButton onClick={removeMyDayHandler} />
        </div>
      ) : null}
    </div>
  );
}

export default MyDayBox;
