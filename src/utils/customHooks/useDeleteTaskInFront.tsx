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
  todoInProjectType,
} from '../types';

/**
 * custom hook for deleting tasks in front-end. this will delete todo in front-end after deleting in backend.
 */

export function useDeleteTaskInFront() {
  const updateNormaTasks = useSetTasks(normalTasksState);
  const updatePlannedTasks = useSetTasks(planbedTasksState);
  const updateImpTasks = useSetTasks(ImpTasksState);
  const updateMydayTasks = useSetTasks(myDayState);
  const updateTodoInProject = useSetTasks(projectTasksAtom);

  function deleteHandler(
    todo: todoType | myDayTodoType | plannedTodoType | todoInProjectType,
  ) {
    if (todo.normalTask) {
      updateNormaTasks(todo, 'delete');
    } else {
      if (todo.projectId) {
        // already checked for undefined
        //@ts-ignore
        updateTodoInProject(todo, 'delete');
      }
    }
    if (todo.dueDate) {
      // already checked for undefined
      //@ts-ignore
      updatePlannedTasks(todo, 'delete');
    }
    if (todo.important) {
      updateImpTasks(todo, 'delete');
    }
    if (todo.myDay) {
      // already checked for undefined
      //@ts-ignore
      updateMydayTasks(todo, 'delete');
    }
  }

  return deleteHandler;
}
