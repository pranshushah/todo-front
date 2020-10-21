import { selector } from 'recoil';
import { loginDetailsState } from '../atoms/loginDetailsAtom';
export const loginState = selector<boolean>({
  key: 'loginState',
  get: ({ get }) => {
    const loginDetails = get(loginDetailsState);
    return loginDetails ? true : false;
  },
});
