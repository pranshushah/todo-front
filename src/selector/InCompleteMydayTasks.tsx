import { selector } from 'recoil';
import { myDayState } from '../atoms/MyDayTaskAtom';
import { myDayTodoType } from '../utils/types/userInfo';
export const inCompleteMyDayTasks = selector<myDayTodoType[]>({
  key: 'inCompleteMyDayTasks',
  get: ({ get }) => {
    const tasks = get(myDayState);
    console.log(tasks);
    const inCompleteTasks = tasks.filter((task) => {
      return task.done === false;
    });
    return inCompleteTasks;
  },
});
