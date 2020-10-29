import { selector } from 'recoil';
import { ImpTasksState } from '../atoms/ImportantTaskAtom';
import { todoType } from '../utils/types/userInfo';
export const completeImpTasks = selector<todoType[]>({
  key: 'completeImpTasks',
  get: ({ get }) => {
    const tasks = get(ImpTasksState);
    const completeTasks = tasks.filter((task) => {
      return task.done;
    });
    return completeTasks;
  },
});
