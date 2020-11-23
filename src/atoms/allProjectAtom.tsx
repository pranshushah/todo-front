import { atom } from 'recoil';
import { project } from '../utils/types';
// this will contain task are imp and done:false
export const projects = atom<project[]>({
  key: 'projectsAtom',
  default: [],
});
