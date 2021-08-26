import { selectorFamily } from 'recoil';
import { planbedTasksState } from '../atoms/plannedTasksState';
import { DayStatus, plannedTodoType, TaskStatus } from '../utils/types';
import { isTomorrow, isToday, isPast } from 'date-fns';

/**
 * get tasks with duedates by their status
 */
export const plannedTasksMapper = selectorFamily<
  plannedTodoType[],
  DayStatus | TaskStatus
>({
  key: 'plannedTasksMApper',
  get:
    (status) =>
    ({ get }) => {
      const tasks = get(planbedTasksState);
      if (status === 'tommorrow') {
        const tomorrowTasks = tasks.filter((task) => {
          return isTomorrow(task.dueDate);
        });
        return tomorrowTasks;
      } else if (status === 'today') {
        const todaysTasks = tasks.filter((task) => {
          return isToday(task.dueDate);
        });
        return todaysTasks;
      } else if (status === 'later') {
        return tasks.filter((task) => {
          return (
            task.done === false &&
            !isPast(task.dueDate) &&
            !isToday(task.dueDate) &&
            !isTomorrow(task.dueDate)
          );
        });
      } else if (status === 'INCOMPLETED') {
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
