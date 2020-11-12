import { selector } from 'recoil';
import { myDayState } from '../atoms/MyDayTaskAtom';
import { myDayTodoType } from '../utils/types';
export const inCompleteMyDayTasks = selector<myDayTodoType[]>({
  key: 'inCompleteMyDayTasks',
  get: ({ get }) => {
    const tasks = get(myDayState);
    const inCompleteTasks = tasks.filter((task) => {
      return task.done === false;
    });
    return inCompleteTasks;
  },
});
