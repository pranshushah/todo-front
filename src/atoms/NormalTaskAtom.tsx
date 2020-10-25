import { atom } from 'recoil';
import { todoType } from '../utils/types/userInfo';
export const normalTasksState = atom<todoType[]>({
  key: 'normalTasksState',
  default: [],
});
