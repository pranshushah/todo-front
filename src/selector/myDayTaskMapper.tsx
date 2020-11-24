import { selectorFamily } from 'recoil';
import { myDayState } from '../atoms/MyDayTaskAtom';
import { myDayTodoType, taskStatus } from '../utils/types';
export const myDayTaskMapper = selectorFamily<myDayTodoType[], taskStatus>({
  key: 'myDayTaskMapper',
  get: (status) => ({ get }) => {
    if (status === taskStatus.completed) {
      const tasks = get(myDayState);
      const completeTasks = tasks.filter((task) => {
        return task.done;
      });
      return completeTasks;
    } else {
      const tasks = get(myDayState);
      const inCompleteTasks = tasks.filter((task) => {
        return task.done === false;
      });
      return inCompleteTasks;
    }
  },
});
