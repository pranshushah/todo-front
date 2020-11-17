import React from 'react';
import Button from '../../UI/Button/Button';
import Styles from './ButtonContainer.module.scss';
import axios from 'axios';
import { selectedTodo } from '../../../atoms/selectedTodoAtom';
import { useRecoilState } from 'recoil';
import { useDeleteTaskInFront } from '../../../utils/TaskListUpdater/useDeleteTaskInFront';
function ButtonContainer() {
  const [todo, setTodo] = useRecoilState(selectedTodo);
  const deleteAllTask = useDeleteTaskInFront();
  async function todoDeleteHandler() {
    if (todo) {
      const res = await axios.patch('/api/edit/todo/delete', {
        todoId: todo.id,
      });
      if (res.status === 200) {
        setTodo(null);
        deleteAllTask(todo);
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
