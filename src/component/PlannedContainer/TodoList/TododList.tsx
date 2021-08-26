import React from 'react';
import { useRecoilValue } from 'recoil';
import { plannedTasksMapper } from '../../../selector/plannedTaskMapper';
import TaskItem from '../../TaskItem/TaskItem';
import Accordion from '../../UI/Accordion/Accordion';

function TododList() {
  const todayTasks = useRecoilValue(plannedTasksMapper('today'));
  const previousTasks = useRecoilValue(plannedTasksMapper('previous'));
  const laterTasks = useRecoilValue(plannedTasksMapper('later'));
  const tommorrowTasks = useRecoilValue(plannedTasksMapper('tommorrow'));
  const todayList = todayTasks.map((todo) => {
    return <TaskItem todo={todo} key={todo.id} from='PLANNED' />;
  });
  const previousTaskList = previousTasks.map((todo) => {
    return <TaskItem key={todo.id} todo={todo} from='PLANNED' />;
  });
  const tommorrowTasksList = tommorrowTasks.map((todo) => {
    return <TaskItem key={todo.id} todo={todo} from='PLANNED' />;
  });
  const laterTasksList = laterTasks.map((todo) => {
    return <TaskItem key={todo.id} todo={todo} from='TASK' />;
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
