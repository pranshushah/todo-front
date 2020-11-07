import { useSetTasks } from '../TaskListUpdater/useSetTask';
import { ImpTasksState } from '../../atoms/ImportantTaskAtom';
import { myDayState } from '../../atoms/MyDayTaskAtom';
import { normalTasksState } from '../../atoms/NormalTaskAtom';
import { planbedTasksState } from '../../atoms/plannedTasksState';
import { todoType, myDayTodoType, plannedTodoType, op } from '../types';

export function useSetAllTask() {
  const updateNormaTasks = useSetTasks(normalTasksState);
  const updatePlannedTasks = useSetTasks(planbedTasksState);
  const updateImpTasks = useSetTasks(ImpTasksState);
  const updateMydayTasks = useSetTasks(myDayState);
  function updateAllTasks(
    todo: todoType | myDayTodoType | plannedTodoType,
    newTodo: todoType | myDayTodoType | plannedTodoType,
  ) {
    updateNormaTasks(newTodo, op.UPDATE);
    if (newTodo.dueDate) {
      newTodo = { ...newTodo, dueDate: new Date(newTodo.dueDate) };
      // already checked for undefined
      //@ts-ignore
      updatePlannedTasks(newTodo, op.UPDATE);
    }
    if (!todo.important && newTodo.important) {
      updateImpTasks(newTodo, op.ADD);
    }
    if (todo.important && !newTodo.important) {
      updateImpTasks(newTodo, op.Del);
    }
    if (todo.important && newTodo.important) {
      updateImpTasks(newTodo, op.UPDATE);
    }
    if (todo.myDay && todo.myDay) {
      // already checked for undefined
      //@ts-ignore
      updateMydayTasks(newTodo, op.UPDATE);
    }
    if (!todo.myDay && newTodo.myDay) {
      // already checked for undefined
      //@ts-ignore
      updateMydayTasks(newTodo, op.ADD);
    }
    if (todo.myDay && !newTodo.myDay) {
      // already checked for undefined
      //@ts-ignore
      updateMydayTasks(newTodo, op.Del);
    }
  }
  return updateAllTasks;
}
