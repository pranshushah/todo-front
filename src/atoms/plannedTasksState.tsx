import { atom } from 'recoil';
import { plannedTodoType } from '../utils/types';
export const planbedTasksState = atom<plannedTodoType[]>({
  key: 'planbedTasksState',
  default: [],
});
