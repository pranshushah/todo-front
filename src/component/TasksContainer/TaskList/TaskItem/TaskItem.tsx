import React from 'react';
import {
  todoType,
  editDoneStatus,
  editImpStatus,
} from '../../../../utils/types/userInfo';
import Styles from './TaskItem.module.scss';
import Checkbox from '../../../UI/CheckBox/CheckBox';
type taskItemProps = {
  todo: todoType;
  onTodoStatusChange: (newStauts: editDoneStatus) => Promise<void>;
  onTodoImpStatusChange: (newStauts: editImpStatus) => Promise<void>;
};

function TaskItem({
  todo,
  onTodoStatusChange,
  onTodoImpStatusChange,
}: taskItemProps) {
  function checkBoxChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.checked) {
      onTodoStatusChange({ todoId: todo.id, done: true });
    }
  }
  function impStatusChangeHandler() {
    onTodoImpStatusChange({ todoId: todo.id, important: !todo.important });
  }
  return (
    <div className={Styles.container}>
      <Checkbox onChange={checkBoxChangeHandler} />
      <div className={Styles.text}>{todo.todoTitle}</div>
      <i
        onClick={impStatusChangeHandler}
        className={
          todo.important
            ? ['fa', 'fa-star', Styles.impFilled].join(' ')
            : ['fa', 'fa-star-o', Styles.imp].join(' ')
        }
      />
    </div>
  );
}

export default TaskItem;
