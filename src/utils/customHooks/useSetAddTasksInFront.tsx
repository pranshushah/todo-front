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
 * custom hook for add tasks in front-end. this will add todo in front-end after adding in backend.
 */

export function useSetAddTaskInFront() {
  const updateNormaTasks = useSetTasks(normalTasksState);
  const updatePlannedTasks = useSetTasks(planbedTasksState);
  const updateImpTasks = useSetTasks(ImpTasksState);
  const updateMydayTasks = useSetTasks(myDayState);
  const updateTodoInProject = useSetTasks(projectTasksAtom);

  function addHandler(
    todo: todoType | myDayTodoType | plannedTodoType | todoInProjectType,
  ) {
    if (todo.normalTask) {
      updateNormaTasks(todo, 'add');
    } else {
      if (todo.projectId !== undefined) {
        // already checked for undefined
        //@ts-ignore
        updateTodoInProject(todo, 'add');
      }
    }
    if (todo.dueDate !== undefined) {
      // already checked for undefined
      //@ts-ignore
      updatePlannedTasks(todo, 'add');
    }
    if (todo.important !== undefined) {
      updateImpTasks(todo, 'add');
    }
    if (todo.myDay !== undefined) {
      // already checked for undefined
      //@ts-ignore
      updateMydayTasks(todo, 'add');
    }
  }

  return addHandler;
}
