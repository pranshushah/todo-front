import { DefaultValue, selector } from 'recoil';
import { ImpTasksState } from '../atoms/ImportantTaskAtom';
import { myDayState } from '../atoms/MyDayTaskAtom';
import { planbedTasksState } from '../atoms/plannedTasksState';
import { normalTasksState } from '../atoms/NormalTaskAtom';
import { projectTasksAtom } from '../atoms/todoInProjects';
import { everyTodoType } from '../utils/types';
/**
 * you can get or set All the todos
 */
export const allTodos = selector<everyTodoType>({
  key: 'allTodos',
  get: ({ get }) => {
    const normalTodos = get(normalTasksState);
    const projectTodos = get(projectTasksAtom);
    return { normalTodos, projectTodos };
  },
  set: ({ set }, updatedValue) => {
    if (!(updatedValue instanceof DefaultValue)) {
      if (updatedValue.normalTodos) {
        set(normalTasksState, updatedValue.normalTodos);
      }
      if (updatedValue.projectTodos) {
        set(projectTasksAtom, updatedValue.projectTodos);
      }
      if (updatedValue.impTodos) {
        set(ImpTasksState, updatedValue.impTodos);
      }
      if (updatedValue.plannedTodos) {
        set(planbedTasksState, updatedValue.plannedTodos);
      }
      if (updatedValue.myDayTodos) {
        set(myDayState, updatedValue.myDayTodos);
      }
    }
  },
});
