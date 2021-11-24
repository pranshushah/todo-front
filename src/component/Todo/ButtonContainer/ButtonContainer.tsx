import React, { useState } from 'react';
import Button from '../../UI/Button/Button';
import Styles from './ButtonContainer.module.scss';
import axios from '../../../axios';
import { selectedTodo } from '../../../atoms/selectedTodoAtom';
import { useRecoilState } from 'recoil';
import { useDeleteTaskInFront } from '../../../utils/customHooks/useDeleteTaskInFront';
import { useSetNotification } from '../../../utils/customHooks/useAddNotification';
import { timeMessageObjCreate } from '../../../utils/helperFunction/timeoutMessage';
import Modal from '../../UI/Modal/Modal';
import { useSetAddTaskInFront } from '../../../utils/customHooks/useSetAddTasksInFront';

function ButtonContainer() {
  const [todo, setTodo] = useRecoilState(selectedTodo);
  const deleteTaskFromAll = useDeleteTaskInFront();
  const { addNotification } = useSetNotification();
  const [showModal, setShowModal] = useState(false);
  const addTaskToAll = useSetAddTaskInFront();

  function modalCloseHandler() {
    setShowModal(false);
  }

  function modalOpenHandler() {
    setShowModal(true);
  }
  async function todoDeleteHandler() {
    if (todo) {
      const oldTodo = { ...todo };
      setTodo(null);
      deleteTaskFromAll(todo);
      setShowModal(false);
      try {
        if (window.navigator.onLine) {
          const res = await axios.patch(
            '/api/edit/todo/delete',
            {
              todoId: todo.id,
            },
            timeMessageObjCreate('Unable to delete todo'),
          );
          if (res.status !== 200) {
            addTaskToAll(oldTodo);
          }
        } else {
          throw new Error('No internet connection');
        }
      } catch (e) {
        addNotification(e.message, 'Network Error');
        addTaskToAll(oldTodo);
      }
    }
  }
  return (
    <>
      <Modal
        modalClosed={modalCloseHandler}
        title={todo ? todo.todoTitle : ''}
        show={showModal}
        deleteButtonTitle='Delete todo'
        modalConfirmed={todoDeleteHandler}
      />
      <div className={Styles.container}>
        <div className={Styles.deleteButtonContainer}>
          <Button dimension='small' danger onClick={modalOpenHandler}>
            Delete Todo
          </Button>
        </div>
      </div>
    </>
  );
}

export default ButtonContainer;
