import React from 'react';
import { useRecoilValue } from 'recoil';
import { plannedTasksMapper } from '../../../selector/plannedTaskMapper';
import TaskItem from '../../TaskItem/TaskItem';
import Accordion from '../../UI/Accordion/Accordion';
import { dayStatus, todoFrom } from '../../../utils/types';

function TododList() {
  const todayTasks = useRecoilValue(plannedTasksMapper(dayStatus.today));
  const previousTasks = useRecoilValue(plannedTasksMapper(dayStatus.previous));
  const todayList = todayTasks.map((todo, index) => {
    return <TaskItem todo={todo} key={index} from={todoFrom.PLANNED} />;
  });
  const previousTaskList = previousTasks.map((todo, index) => {
    return <TaskItem key={index} todo={todo} />;
  });
  return (
    <div>
      {todayList.length > 0 ? (
        <Accordion content={todayList} title='Today' />
      ) : null}
      {previousTaskList.length > 0 ? (
        <Accordion content={previousTaskList} title='Earlier' />
      ) : null}
    </div>
  );
}

export default TododList;
