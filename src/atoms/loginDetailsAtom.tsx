import { atom } from 'recoil';
import { userInfo } from '../utils/types';
/**
 * atom containing user details
 */

export const loginDetailsState = atom<userInfo | null>({
  key: 'loginDetailsState',
  default: null,
});
