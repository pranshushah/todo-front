import { selectorFamily } from 'recoil';
import { normalTasksState } from '../atoms/NormalTaskAtom';
import { taskStatus, todoType } from '../utils/types';
export const normalTasksMapper = selectorFamily<todoType[], taskStatus>({
  key: 'normalTasksMapper',
  get: (status) => ({ get }) => {
    if (status === taskStatus.completed) {
      const tasks = get(normalTasksState);
      const completeTasks = tasks.filter((task) => {
        return task.done;
      });
      return completeTasks;
    } else {
      const tasks = get(normalTasksState);
      const inCompleteTasks = tasks.filter((task) => {
        return task.done === false;
      });
      return inCompleteTasks;
    }
  },
});
