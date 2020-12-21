import { atom } from 'recoil';
import { notification } from '../utils/types';
/**
 * atom containing notification list
 */

export const notificationAtom = atom<notification[]>({
  key: 'notificationArray',
  default: [],
});
