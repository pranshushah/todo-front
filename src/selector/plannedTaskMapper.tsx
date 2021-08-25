import { selectorFamily } from 'recoil';
import { planbedTasksState } from '../atoms/plannedTasksState';
import { plannedTodoType, dayStatus, taskStatus } from '../utils/types';
import { isTomorrow, isToday, isPast } from 'date-fns';

/**
 * get tasks with duedates by their status
 */
export const plannedTasksMapper = selectorFamily<
  plannedTodoType[],
  dayStatus | taskStatus
>({
  key: 'plannedTasksMApper',
  get:
    (status) =>
    ({ get }) => {
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
      } else if (status === dayStatus.later) {
        return tasks.filter((task) => {
          return (
            task.done === false &&
            !isPast(task.dueDate) &&
            !isToday(task.dueDate) &&
            !isTomorrow(task.dueDate)
          );
        });
      } else if (status === taskStatus.inCompleted) {
        const inCompleteTasks = tasks.filter((task) => {
          return task.done === false;
        });
        return inCompleteTasks;
      } else {
        const previousTasks = tasks.filter((task) => {
          return isPast(task.dueDate) && !task.done;
        });
        return previousTasks;
      }
    },
});
