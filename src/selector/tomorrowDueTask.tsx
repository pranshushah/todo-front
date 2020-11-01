import { selector } from 'recoil';
import { planbedTasksState } from '../atoms/plannedTasksState';
import { plannedTodoType } from '../utils/types';
import { isTomorrow } from 'date-fns';

export const tomorrowDuesTasks = selector<plannedTodoType[]>({
  key: 'tomorrowDuesTasks',
  get: ({ get }) => {
    const tasks = get(planbedTasksState);
    const tomorrowTasks = tasks.filter((task) => {
      return isTomorrow(task.dueDate);
    });
    return tomorrowTasks;
  },
});
