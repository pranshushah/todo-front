import { atom } from 'recoil';
import { project } from '../utils/types';
/**
 * atom containing list of projects
 */
export const projects = atom<project[]>({
  key: 'projectsAtom',
  default: [],
});
