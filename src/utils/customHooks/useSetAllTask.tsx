import { useSetTasks } from './useSetTask';
import { ImpTasksState } from '../../atoms/ImportantTaskAtom';
import { myDayState } from '../../atoms/MyDayTaskAtom';
import { normalTasksState } from '../../atoms/NormalTaskAtom';
import { planbedTasksState } from '../../atoms/plannedTasksState';
import { projectTasksAtom } from '../../atoms/todoInProjects';
import {
  todoType,
  myDayTodoType,
  plannedTodoType,
  op,
  todoInProjectType,
} from '../types';

export function useSetAllTask() {
  const updateNormalTasks = useSetTasks(normalTasksState);
  const updatePlannedTasks = useSetTasks(planbedTasksState);
  const updateImpTasks = useSetTasks(ImpTasksState);
  const updateMydayTasks = useSetTasks(myDayState);
  const updateTodoInProject = useSetTasks(projectTasksAtom);
  function updateAllTasks(
    todo: todoType | myDayTodoType | plannedTodoType | todoInProjectType,
    newTodo: todoType | myDayTodoType | plannedTodoType | todoInProjectType,
  ) {
    if (newTodo.normalTask) {
      updateNormalTasks(newTodo, op.UPDATE);
    } else {
      if (newTodo.projectId) {
        // already checked for undefined
        //@ts-ignore
        updateTodoInProject(newTodo, op.UPDATE);
      }
    }
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
