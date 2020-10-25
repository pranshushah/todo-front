import React from 'react';
import TaskItem from './TaskItem/TaskItem';
import { useRecoilValue } from 'recoil';
import { inCompleteNormalTasks } from '../../../selector/inCompleteNormalTasks';

function TodoList() {
  const todoList = useRecoilValue(inCompleteNormalTasks);

  const taskList = todoList.map((todo, index) => {
    return <TaskItem todo={todo} key={index} />;
  });
  return <div>{taskList}</div>;
}

export default TodoList;
