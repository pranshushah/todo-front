import { selector } from 'recoil';
import { normalTasksState } from '../atoms/NormalTaskAtom';
import { todoType } from '../utils/types/userInfo';
export const inCompleteNormalTasks = selector<todoType[]>({
  key: 'inCompleteNormalTasks',
  get: ({ get }) => {
    const tasks = get(normalTasksState);
    const inCompleteTasks = tasks.filter((task) => {
      return task.done === false;
    });
    return inCompleteTasks;
  },
});
