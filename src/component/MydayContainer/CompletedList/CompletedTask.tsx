import React from 'react';
import { completeMydayTasks } from '../../../selector/completedMyDayTasks';
import { useRecoilValue } from 'recoil';
import CompletedTaskItem from '../../CompletedItem/CompletedItem';
import Accordion from '../../UI/Accordion/Accordion';

export default function CompletedTask() {
  const completedTask = useRecoilValue(completeMydayTasks);
  const completedTaskList = completedTask.map((task, index) => (
    <CompletedTaskItem todo={task} key={index} />
  ));
  return (
    <div>
      <Accordion title='Completed Tasks' content={completedTaskList} />
    </div>
  );
}
