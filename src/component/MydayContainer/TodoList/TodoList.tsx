import React from 'react';
import { useRecoilValue } from 'recoil';
import { myDayTaskMapper } from '../../../selector/myDayTaskMapper';
import TaskItem from '../../TaskItem/TaskItem';
import { taskStatus, todoFrom } from '../../../utils/types';
function TodoList() {
  const inCompleteTasks = useRecoilValue(
    myDayTaskMapper(taskStatus.inCompleted),
  );
  const inCompleteTaskList = inCompleteTasks.map((task, index) => (
    <TaskItem todo={task} key={index} from={todoFrom.MYDAY} />
  ));
  return <div>{inCompleteTaskList}</div>;
}

export default React.memo(TodoList);
