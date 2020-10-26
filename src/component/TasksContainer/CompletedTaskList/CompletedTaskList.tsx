import React from 'react';
import {} from '../../../utils/types/userInfo';
import { completeNormalTasks } from '../../../selector/completedNormalTasks';
import { useRecoilValue } from 'recoil';
import CompletedTaskItem from './CompletedItem/CompletedItem';
import Accordion from '../../UI/Accordion/Accordion';

export default function CompletedTask() {
  const completedTask = useRecoilValue(completeNormalTasks);
  const completedTaskList = completedTask.map((task, index) => (
    <CompletedTaskItem todo={task} key={index} />
  ));
  return (
    <div>
      <Accordion title='Completed Tasks' content={completedTaskList} />
    </div>
  );
}
