import React from 'react';
import { useRecoilValue } from 'recoil';
import { tasksInGivenProject } from '../../../selector/getTaskByProject';
import TaskItem from '../../TaskItem/TaskItem';
import { project } from '../../../utils/types';

type todoListProps = {
  project: project;
};

function TodoList({ project }: todoListProps) {
  const inCompleteTasks = useRecoilValue(
    tasksInGivenProject({
      projectId: project.id,
      taskdone: 'INCOMPLETED',
    }),
  );
  const inCompleteTaskList = inCompleteTasks.map((task) => (
    <TaskItem todo={task} key={task.id} from='PROJECT' />
  ));
  return <div>{inCompleteTaskList}</div>;
}

export default React.memo(TodoList);
