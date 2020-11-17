import React from 'react';
import {} from '../../../utils/types';
import { completeNormalTasks } from '../../../selector/completedNormalTasks';
import { useRecoilValue } from 'recoil';
import TaskItem from '../../TaskItem/TaskItem';
import Accordion from '../../UI/Accordion/Accordion';

export default function CompletedTask() {
  const completedTask = useRecoilValue(completeNormalTasks);
  const completedTaskList = completedTask.map((task, index) => (
    <TaskItem todo={task} key={index} />
  ));
  return (
    <div>
      <Accordion title='Completed Tasks' content={completedTaskList} />
    </div>
  );
}
