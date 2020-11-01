import { atom } from 'recoil';
import { userInfo } from '../utils/types';
export const loginDetailsState = atom<userInfo | null>({
  key: 'loginDetailsState',
  default: null,
});
