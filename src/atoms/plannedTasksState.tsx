import { atom } from 'recoil';
import { plannedTodoType } from '../utils/types/userInfo';
export const planbedTasksState = atom<plannedTodoType[]>({
  key: 'planbedTasksState',
  default: [],
});
