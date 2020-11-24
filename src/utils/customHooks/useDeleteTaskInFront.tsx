import { useSetTasks } from './useSetTask';
import { ImpTasksState } from '../../atoms/ImportantTaskAtom';
import { myDayState } from '../../atoms/MyDayTaskAtom';
import { normalTasksState } from '../../atoms/NormalTaskAtom';
import { planbedTasksState } from '../../atoms/plannedTasksState';
import { todoType, myDayTodoType, plannedTodoType, op } from '../types';

export function useDeleteTaskInFront() {
  const updateNormaTasks = useSetTasks(normalTasksState);
  const updatePlannedTasks = useSetTasks(planbedTasksState);
  const updateImpTasks = useSetTasks(ImpTasksState);
  const updateMydayTasks = useSetTasks(myDayState);

  function deleteHandler(todo: todoType | myDayTodoType | plannedTodoType) {
    updateNormaTasks(todo, op.Del);
    if (todo.dueDate) {
      // already checked for undefined
      //@ts-ignore
      updatePlannedTasks(todo, op.Del);
    }
    if (todo.important) {
      updateImpTasks(todo, op.Del);
    }
    if (todo.myDay) {
      // already checked for undefined
      //@ts-ignore
      updateMydayTasks(todo, op.Del);
    }
  }

  return deleteHandler;
}
