import { selectorFamily } from 'recoil';
import { planbedTasksState } from '../atoms/plannedTasksState';
import { plannedTodoType, dayStatus } from '../utils/types';
import { isTomorrow, isToday, isPast } from 'date-fns';

export const plannedTasksMApper = selectorFamily<plannedTodoType[], dayStatus>({
  key: 'plannedTasksMApper',
  get: (status) => ({ get }) => {
    const tasks = get(planbedTasksState);
    if (status === dayStatus.tommorrow) {
      const tomorrowTasks = tasks.filter((task) => {
        return isTomorrow(task.dueDate);
      });
      return tomorrowTasks;
    } else if (status === dayStatus.today) {
      const todaysTasks = tasks.filter((task) => {
        return isToday(task.dueDate);
      });
      return todaysTasks;
    } else {
      const previousTasks = tasks.filter((task) => {
        return isPast(task.dueDate) && !task.done;
      });
      return previousTasks;
    }
  },
});
