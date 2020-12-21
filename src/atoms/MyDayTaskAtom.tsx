import { atom } from 'recoil';
import { myDayTodoType } from '../utils/types';
/**
 * atom containing myday todo list
 */
export const myDayState = atom<myDayTodoType[]>({
  key: 'myDayState',
  default: [],
});
