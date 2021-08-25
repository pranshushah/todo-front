import { atom } from 'recoil';
import { todoType } from '../utils/types';
/**
 * atom containing normal todo list
 */

export const normalTasksState = atom<todoType[]>({
  key: 'normalTasksState',
  default: [],
});
