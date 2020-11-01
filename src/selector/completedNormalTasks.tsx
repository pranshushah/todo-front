import { selector } from 'recoil';
import { normalTasksState } from '../atoms/NormalTaskAtom';
import { todoType } from '../utils/types';
export const completeNormalTasks = selector<todoType[]>({
  key: 'completeNormalTasks',
  get: ({ get }) => {
    const tasks = get(normalTasksState);
    const completeTasks = tasks.filter((task) => {
      return task.done;
    });
    return completeTasks;
  },
});
