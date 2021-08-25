import { atom } from 'recoil';
import { plannedTodoType } from '../utils/types';
/**
 * atom containing planned list
 */

export const planbedTasksState = atom<plannedTodoType[]>({
  key: 'planbedTasksState',
  default: [],
});
