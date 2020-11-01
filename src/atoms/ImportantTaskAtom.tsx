import { atom } from 'recoil';
import { todoType } from '../utils/types';
// this will contain task are imp and done:false
export const ImpTasksState = atom<todoType[]>({
  key: 'ImpTasksState',
  default: [],
});
