import React from 'react';
import { useRecoilValue } from 'recoil';
import { tasksInGivenProject } from '../../../selector/getTaskByProject';
import TaskItem from '../../TaskItem/TaskItem';
import { taskStatus } from '../../../utils/types';

type todoListProps = {
  projectId: string;
};

function TodoList({ projectId }: todoListProps) {
  const inCompleteTasks = useRecoilValue(
    tasksInGivenProject({ projectId, taskdone: taskStatus.inCompleted }),
  );
  const inCompleteTaskList = inCompleteTasks.map((task) => (
    <TaskItem todo={task} key={task.id} />
  ));
  return <div>{inCompleteTaskList}</div>;
}

export default React.memo(TodoList);
