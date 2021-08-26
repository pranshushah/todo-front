import { selectorFamily } from 'recoil';
import { normalTasksState } from '../atoms/NormalTaskAtom';
import { TaskStatus, todoType } from '../utils/types';
/**
 * get normal tasks by their status
 */
export const normalTasksMapper = selectorFamily<todoType[], TaskStatus>({
  key: 'normalTasksMapper',
  get:
    (status) =>
    ({ get }) => {
      const tasks = get(normalTasksState);
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
