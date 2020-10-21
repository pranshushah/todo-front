import { atom } from 'recoil';
import { userInfo } from '../utils/types/userInfo';
export const loginDetailsState = atom<userInfo | null>({
  key: 'loginDetailsState',
  default: null,
});
