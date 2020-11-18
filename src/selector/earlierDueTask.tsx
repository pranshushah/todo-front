import { selector } from 'recoil';
import { planbedTasksState } from '../atoms/plannedTasksState';
import { plannedTodoType } from '../utils/types';
import { isPast } from 'date-fns';

export const previousDuesTasks = selector<plannedTodoType[]>({
  key: 'PreviousDuesTasks',
  get: ({ get }) => {
    const tasks = get(planbedTasksState);
    const previousTasks = tasks.filter((task) => {
      return isPast(task.dueDate) && !task.done;
    });
    return previousTasks;
  },
});
