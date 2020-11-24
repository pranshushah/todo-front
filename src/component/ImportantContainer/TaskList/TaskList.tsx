import React from 'react';
import { impTasksMapper } from '../../../selector/impTasksMapper';
import { useRecoilValue } from 'recoil';
import TaskItem from '../../TaskItem/TaskItem';
import { taskStatus } from '../../../utils/types';
function TaskList() {
  const inCompleteTasks = useRecoilValue(
    impTasksMapper(taskStatus.inCompleted),
  );
  const inCompleteTaskList = inCompleteTasks.map((task, index) => (
    <TaskItem todo={task} key={index} />
  ));
  return <div>{inCompleteTaskList}</div>;
}
export default TaskList;
