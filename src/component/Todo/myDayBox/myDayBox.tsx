import React from 'react';
import Styles from './myDayBox.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun } from '@fortawesome/free-solid-svg-icons';
import { useRecoilState } from 'recoil';
import { selectedTodo } from '../../../atoms/selectedTodoAtom';
import axios from 'axios';
import { MydayTodoBodyType } from '../../../utils/types';
import { useSetAllTask } from '../../../utils/TaskListUpdater/useSetAllTask';

function MyDayBox() {
  const [todo, setTodo] = useRecoilState(selectedTodo);
  const updateAllTask = useSetAllTask();
  async function AddToMyDayHandler() {
    if (!todo?.myDay && todo) {
      const res = await axios.patch<MydayTodoBodyType>('/api/todo/edit/myday', {
        todoId: todo.id,
        myDay: true,
      });
      if (res.status === 200) {
        if (res.data.dueDate) {
          const newTodo = {
            ...res.data,
            createdAt: new Date(res.data.createdAt),
            dueDate: new Date(res.data.dueDate),
          };
          updateAllTask(todo, newTodo);
          setTodo(newTodo);
        } else {
          const newTodo = {
            ...res.data,
            createdAt: new Date(res.data.createdAt),
            dueDate: undefined,
          };
          updateAllTask(todo, newTodo);
          setTodo(newTodo);
        }
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
        if (res.data.dueDate) {
          const newTodo = {
            ...res.data,
            createdAt: new Date(res.data.createdAt),
            dueDate: new Date(res.data.dueDate),
          };
          updateAllTask(todo, newTodo);
          setTodo(newTodo);
        } else {
          const newTodo = {
            ...res.data,
            createdAt: new Date(res.data.createdAt),
            dueDate: undefined,
          };
          updateAllTask(todo, newTodo);
          setTodo(newTodo);
        }
      }
    }
  }

  return (
    <div className={Styles.mydayContainer}>
      <div className={Styles.mydayTextContainer}>
        <FontAwesomeIcon icon={faSun} />
        <span
          className={
            todo?.myDay
              ? [Styles.mydayText, Styles.activeText].join(' ')
              : Styles.mydayText
          }
          onClick={AddToMyDayHandler}>
          {todo?.myDay ? 'Added to My Day' : 'Add to My Day'}
        </span>
      </div>
      {todo?.myDay ? (
        <button className={Styles.closeButton} onClick={removeMyDayHandler}>
          &times;
        </button>
      ) : null}
    </div>
  );
}

export default MyDayBox;
