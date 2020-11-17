import React from 'react';
import { useRecoilValue } from 'recoil';
import { todayDuesTasks } from '../../../selector/todayDueTasks';
import TaskItem from '../../TaskItem/TaskItem';
import Accordion from '../../UI/Accordion/Accordion';
import { todoFrom } from '../../../utils/types';

function TododList() {
  const todayTasks = useRecoilValue(todayDuesTasks);
  const todayList = todayTasks.map((todo, index) => {
    return <TaskItem todo={todo} key={index} from={todoFrom.PLANNED} />;
  });
  return (
    <div>
      {todayList.length > 0 ? (
        <Accordion content={todayList} title='Today' />
      ) : null}
    </div>
  );
}

export default TododList;
