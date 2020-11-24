import React from 'react';
import { tasksInGivenProject } from '../../../selector/getTaskByProject';
import { useRecoilValue } from 'recoil';
import TaskItem from '../../TaskItem/TaskItem';
import Accordion from '../../UI/Accordion/Accordion';
import { taskStatus } from '../../../utils/types';

type completedTasksProps = {
  projectId: string;
};

function CompletedTasks({ projectId }: completedTasksProps) {
  const completedTask = useRecoilValue(
    tasksInGivenProject({ projectId, taskdone: taskStatus.completed }),
  );
  const completedTaskList = completedTask.map((task, index) => (
    <TaskItem todo={task} key={index} />
  ));
  return (
    <div>
      <Accordion title='Completed Tasks' content={completedTaskList} />
    </div>
  );
}

export default React.memo(CompletedTasks);
