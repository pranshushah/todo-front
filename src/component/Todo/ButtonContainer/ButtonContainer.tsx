import React from 'react';
import Button from '../../UI/Button/Button';
import Styles from './ButtonContainer.module.scss';
import axios from 'axios';
import { selectedTodo } from '../../../atoms/selectedTodoAtom';
import { useRecoilState } from 'recoil';
import { useDeleteTaskInFront } from '../../../utils/TaskListUpdater/useDeleteTaskInFront';
import { useSetNotification } from '../../../utils/TaskListUpdater/useAddNotification';
function ButtonContainer() {
  const [todo, setTodo] = useRecoilState(selectedTodo);
  const deleteAllTask = useDeleteTaskInFront();
  const { addNotification } = useSetNotification();
  async function todoDeleteHandler() {
    if (todo) {
      try {
        if (window.navigator.onLine) {
          const res = await axios.patch(
            '/api/edit/todo/delete',
            {
              todoId: todo.id,
            },
            {
              timeout: 9000,
              timeoutErrorMessage: 'Unable to delete todo',
            },
          );
          if (res.status === 200) {
            setTodo(null);
            deleteAllTask(todo);
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
    <div className={Styles.container}>
      <div className={Styles.deleteButtonContainer}>
        <Button dimension='small' danger onClick={todoDeleteHandler}>
          Delete Todo
        </Button>
      </div>
    </div>
  );
}

export default ButtonContainer;
