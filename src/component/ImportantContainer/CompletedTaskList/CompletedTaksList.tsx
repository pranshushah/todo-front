import React from 'react';
import { completeImpTasks } from '../../../selector/completedImpTasks';
import { useRecoilValue } from 'recoil';
import TaskItem from '../../TaskItem/TaskItem';
import Accordion from '../../UI/Accordion/Accordion';

export default function CompletedTask() {
  const completedTask = useRecoilValue(completeImpTasks);
  const completedTaskList = completedTask.map((task, index) => (
    <TaskItem todo={task} key={index} />
  ));
  return (
    <div>
      <Accordion
        title='Completed Important Tasks'
        content={completedTaskList}
      />
    </div>
  );
}
