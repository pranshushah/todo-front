import React from 'react';
import { impTasksMapper } from '../../../selector/impTasksMapper';
import { useRecoilValue } from 'recoil';
import TaskItem from '../../TaskItem/TaskItem';
import Accordion from '../../UI/Accordion/Accordion';
import { taskStatus } from '../../../utils/types';

export default function CompletedTask() {
  const completedTask = useRecoilValue(impTasksMapper(taskStatus.completed));
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
