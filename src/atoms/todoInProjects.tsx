import { atom } from 'recoil';
import { todoInProjectType } from '../utils/types';
/**
 * atom containing todo list in project
 */
export const projectTasksAtom = atom<todoInProjectType[]>({
  key: 'projectTasksAtom',
  default: [],
});
