import { atom } from 'recoil';
import { notification } from '../utils/types';
export const notificationAtom = atom<notification[]>({
  key: 'notificationArray',
  default: [],
});
