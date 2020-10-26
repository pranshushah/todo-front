import { selector } from 'recoil';
import { planbedTasksState } from '../atoms/plannedTasksState';
import { plannedTodoType } from '../utils/types/userInfo';
import { isToday } from 'date-fns';

export const todayDuesTasks = selector<plannedTodoType[]>({
  key: 'todayDuesTasks',
  get: ({ get }) => {
    const tasks = get(planbedTasksState);
    const todaysTasks = tasks.filter((task) => {
      return isToday(task.dueDate);
    });
    return todaysTasks;
  },
});
