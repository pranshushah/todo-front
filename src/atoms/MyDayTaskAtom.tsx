import { atom } from 'recoil';
import { myDayTodoType } from '../utils/types/userInfo';
export const myDayState = atom<myDayTodoType[]>({
  key: 'myDayState',
  default: [],
});
