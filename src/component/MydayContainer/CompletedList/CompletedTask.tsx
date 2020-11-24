import React from 'react';
import { myDayTaskMapper } from '../../../selector/myDayTaskMapper';
import { useRecoilValue } from 'recoil';
import TaskItem from '../../TaskItem/TaskItem';
import Accordion from '../../UI/Accordion/Accordion';
import { taskStatus, todoFrom } from '../../../utils/types';
export default function CompletedTask() {
  const completedTask = useRecoilValue(myDayTaskMapper(taskStatus.completed));
  const completedTaskList = completedTask.map((task, index) => (
    <TaskItem todo={task} key={index} from={todoFrom.MYDAY} />
  ));
  return (
    <div>
      <Accordion title='Completed Tasks' content={completedTaskList} />
    </div>
  );
}
