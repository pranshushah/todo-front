import React from 'react';
import TaskItem from '../../TaskItem/TaskItem';
import { useRecoilValue } from 'recoil';
import { normalTasksMapper } from '../../../selector/normalTasksMapper';
import { taskStatus } from '../../../utils/types';

function TodoList() {
  const todoList = useRecoilValue(normalTasksMapper(taskStatus.inCompleted));

  const taskList = todoList.map((todo, index) => {
    return <TaskItem todo={todo} key={index} />;
  });
  return <div>{taskList}</div>;
}

export default TodoList;
