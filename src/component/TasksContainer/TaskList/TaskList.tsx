import React from 'react';
import {
  todoType,
  editDoneStatus,
  editImpStatus,
} from '../../../utils/types/userInfo';
import TaskItem from './TaskItem/TaskItem';

type TodoListProps = {
  todoList: todoType[];
  onTodoDoneStatusChange: (newStauts: editDoneStatus) => Promise<void>;
  onTodoImpStatusChange: (newStauts: editImpStatus) => Promise<void>;
};

function TodoList({
  todoList,
  onTodoDoneStatusChange,
  onTodoImpStatusChange,
}: TodoListProps) {
  const taskList = todoList.map((todo, index) => {
    return (
      <TaskItem
        todo={todo}
        key={index}
        onTodoStatusChange={onTodoDoneStatusChange}
        onTodoImpStatusChange={onTodoImpStatusChange}
      />
    );
  });
  return <div>{taskList}</div>;
}

export default TodoList;
