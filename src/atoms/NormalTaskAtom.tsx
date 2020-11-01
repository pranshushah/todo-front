import { atom } from 'recoil';
import { todoType } from '../utils/types';
export const normalTasksState = atom<todoType[]>({
  key: 'normalTasksState',
  default: [],
});
