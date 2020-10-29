import { selector } from 'recoil';
import { ImpTasksState } from '../atoms/ImportantTaskAtom';
import { todoType } from '../utils/types/userInfo';
export const inCompleteImpTasks = selector<todoType[]>({
  key: 'inCompleteImpTasks',
  get: ({ get }) => {
    const tasks = get(ImpTasksState);
    const inCompleteTasks = tasks.filter((task) => {
      return task.done === false;
    });
    return inCompleteTasks;
  },
});
