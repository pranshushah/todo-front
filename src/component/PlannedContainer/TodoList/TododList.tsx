import React from 'react';
import { useRecoilValue } from 'recoil';
import { plannedTasksMapper } from '../../../selector/plannedTaskMapper';
import TaskItem from '../../TaskItem/TaskItem';
import Accordion from '../../UI/Accordion/Accordion';
import { dayStatus, todoFrom } from '../../../utils/types';

function TododList() {
  const todayTasks = useRecoilValue(plannedTasksMapper(dayStatus.today));
  const previousTasks = useRecoilValue(plannedTasksMapper(dayStatus.previous));
  const laterTasks = useRecoilValue(plannedTasksMapper(dayStatus.later));
  const tommorrowTasks = useRecoilValue(
    plannedTasksMapper(dayStatus.tommorrow),
  );
  const todayList = todayTasks.map((todo) => {
    return <TaskItem todo={todo} key={todo.id} from={todoFrom.PLANNED} />;
  });
  const previousTaskList = previousTasks.map((todo) => {
    return <TaskItem key={todo.id} todo={todo} from={todoFrom.PLANNED} />;
  });
  const tommorrowTasksList = tommorrowTasks.map((todo) => {
    return <TaskItem key={todo.id} todo={todo} from={todoFrom.PLANNED} />;
  });
  const laterTasksList = laterTasks.map((todo) => {
    return <TaskItem key={todo.id} todo={todo} from={todoFrom.TASK} />;
  });
  return (
    <div>
      {todayList.length > 0 ? (
        <Accordion title='Today'>{todayList}</Accordion>
      ) : null}
      {tommorrowTasksList.length > 0 ? (
        <Accordion title='Tommorrow'>{tommorrowTasksList}</Accordion>
      ) : null}
      {laterTasksList.length > 0 ? (
        <Accordion title='Later'>{laterTasksList}</Accordion>
      ) : null}
      {previousTaskList.length > 0 ? (
        <Accordion title='Earlier'>{previousTaskList}</Accordion>
      ) : null}
    </div>
  );
}

export default TododList;
