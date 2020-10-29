import React from 'react';
import { inCompleteImpTasks } from '../../../selector/inCompleteImpTasks';
import { useRecoilValue } from 'recoil';
import TaskItem from './TaskItem/TaskItem';
function TaskList() {
  const inCompleteTasks = useRecoilValue(inCompleteImpTasks);
  const inCompleteTaskList = inCompleteTasks.map((task, index) => (
    <TaskItem todo={task} key={index} />
  ));
  return <div>{inCompleteTaskList}</div>;
}
export default TaskList;
