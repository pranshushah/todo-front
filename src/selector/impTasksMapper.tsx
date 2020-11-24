import { selectorFamily } from 'recoil';
import { ImpTasksState } from '../atoms/ImportantTaskAtom';
import { todoType, taskStatus } from '../utils/types';
export const impTasksMapper = selectorFamily<todoType[], taskStatus>({
  key: 'impTasksMapper',
  get: (status) => ({ get }) => {
    const tasks = get(ImpTasksState);

    if (status === taskStatus.completed) {
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
