import React from 'react';
import { tasksInGivenProject } from '../../../selector/getTaskByProject';
import { useRecoilValue } from 'recoil';
import TaskItem from '../../TaskItem/TaskItem';
import Accordion from '../../UI/Accordion/Accordion';
import { taskStatus, todoFrom, project } from '../../../utils/types';

type completedTasksProps = {
  project: project;
};

function CompletedTasks({ project }: completedTasksProps) {
  const completedTask = useRecoilValue(
    tasksInGivenProject({
      projectId: project.id,
      taskdone: taskStatus.completed,
    }),
  );
  const completedTaskList = completedTask.map((task) => (
    <TaskItem todo={task} key={task.id} from={todoFrom.PROJECT} />
  ));
  return (
    <div>
      <Accordion title='Completed Tasks'>{completedTaskList}</Accordion>
    </div>
  );
}

export default React.memo(CompletedTasks);
