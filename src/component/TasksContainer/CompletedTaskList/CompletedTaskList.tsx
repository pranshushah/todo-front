import React from 'react';
import { taskStatus } from '../../../utils/types';
import { normalTasksMapper } from '../../../selector/normalTasksMapper';
import { useRecoilValue } from 'recoil';
import TaskItem from '../../TaskItem/TaskItem';
import Accordion from '../../UI/Accordion/Accordion';

export default function CompletedTask() {
  const completedTask = useRecoilValue(normalTasksMapper(taskStatus.completed));
  const completedTaskList = completedTask.map((task, index) => (
    <TaskItem todo={task} key={index} />
  ));
  return (
    <div>
      <Accordion title='Completed Tasks' content={completedTaskList} />
    </div>
  );
}
