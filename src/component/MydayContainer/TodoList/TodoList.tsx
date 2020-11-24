import React from 'react';
import { useRecoilValue } from 'recoil';
import { inCompleteMyDayTasks } from '../../../selector/InCompleteMydayTasks';
import TaskItem from '../../TaskItem/TaskItem';
import { todoFrom } from '../../../utils/types';
function TodoList() {
  const inCompleteTasks = useRecoilValue(inCompleteMyDayTasks);
  const inCompleteTaskList = inCompleteTasks.map((task, index) => (
    <TaskItem todo={task} key={index} from={todoFrom.MYDAY} />
  ));
  return <div>{inCompleteTaskList}</div>;
}

export default React.memo(TodoList);
