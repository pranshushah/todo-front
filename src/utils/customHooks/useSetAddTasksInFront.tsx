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
      updateNormaTasks(todo, op.ADD);
    } else {
      if (todo.projectId) {
        // already checked for undefined
        //@ts-ignore
        updateTodoInProject(todo, op.ADD);
      }
    }
    if (todo.dueDate) {
      // already checked for undefined
      //@ts-ignore
      updatePlannedTasks(todo, op.ADD);
    }
    if (todo.important) {
      updateImpTasks(todo, op.ADD);
    }
    if (todo.myDay) {
      // already checked for undefined
      //@ts-ignore
      updateMydayTasks(todo, op.ADD);
    }
  }

  return addHandler;
}
