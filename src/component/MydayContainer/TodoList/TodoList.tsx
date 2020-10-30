import React from 'react';
import { useRecoilValue } from 'recoil';
import { inCompleteMyDayTasks } from '../../../selector/InCompleteMydayTasks';
import TaskItem from '../../TaskItem/TaskItem';

function TodoList() {
  const inCompleteTasks = useRecoilValue(inCompleteMyDayTasks);
  const inCompleteTaskList = inCompleteTasks.map((task, index) => (
    <TaskItem todo={task} key={index} />
  ));
  return <div>{inCompleteTaskList}</div>;
}

export default TodoList;
