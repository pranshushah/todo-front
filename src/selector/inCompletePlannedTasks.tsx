import { selector } from 'recoil';
import { planbedTasksState } from '../atoms/plannedTasksState';
import { plannedTodoType } from '../utils/types';
export const inCompletePlannedTasks = selector<plannedTodoType[]>({
  key: 'inCompletePlannedTasks',
  get: ({ get }) => {
    const tasks = get(planbedTasksState);
    const inCompleteTasks = tasks.filter((task) => {
      return task.done === false;
    });
    return inCompleteTasks;
  },
});
