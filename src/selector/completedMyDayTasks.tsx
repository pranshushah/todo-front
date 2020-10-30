import { selector } from 'recoil';
import { myDayState } from '../atoms/MyDayTaskAtom';
import { myDayTodoType } from '../utils/types/userInfo';
export const completeMydayTasks = selector<myDayTodoType[]>({
  key: 'completeMydayTasks',
  get: ({ get }) => {
    const tasks = get(myDayState);
    const completeTasks = tasks.filter((task) => {
      return task.done;
    });
    return completeTasks;
  },
});
