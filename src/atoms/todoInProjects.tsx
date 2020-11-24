import { atom } from 'recoil';
import { todoInProjectType } from '../utils/types';
export const projectTasksAtom = atom<todoInProjectType[]>({
  key: 'projectTasksAtom',
  default: [],
});
