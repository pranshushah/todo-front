import { selectorFamily } from 'recoil';
import { myDayState } from '../atoms/MyDayTaskAtom';
import { myDayTodoType, TaskStatus } from '../utils/types';
/**
 * get myday tasks tasks by their status
 */
export const myDayTaskMapper = selectorFamily<myDayTodoType[], TaskStatus>({
  key: 'myDayTaskMapper',
  get:
    (status) =>
    ({ get }) => {
      const tasks = get(myDayState);
      if (status === 'COMPLETED') {
        const completeTasks = tasks.filter((task) => {
          return task.done;
        });
        return completeTasks;
      } else {
        const inCompleteTasks = tasks.filter((task) => {
          return task.done === false;
        });
        return inCompleteTasks;
      }
    },
});
