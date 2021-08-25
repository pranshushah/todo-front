import { atom } from 'recoil';
import { todoType } from '../utils/types';
/**
 * atom containing imp todo list
 */
export const ImpTasksState = atom<todoType[]>({
  key: 'ImpTasksState',
  default: [],
});
