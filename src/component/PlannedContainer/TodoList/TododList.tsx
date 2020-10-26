import React from 'react';
import { useRecoilValue } from 'recoil';
import { todayDuesTasks } from '../../../selector/todayDueTasks';
import TodoITem from './TodoItem/TodoItem';
import Accordion from '../../UI/Accordion/Accordion';

function TododList() {
  const todayTasks = useRecoilValue(todayDuesTasks);
  const todayList = todayTasks.map((todo, index) => {
    return <TodoITem todo={todo} key={index} />;
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
