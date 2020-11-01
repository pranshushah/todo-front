import { atom } from 'recoil';
import { myDayTodoType } from '../utils/types';
export const myDayState = atom<myDayTodoType[]>({
  key: 'myDayState',
  default: [],
});
