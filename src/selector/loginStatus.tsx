import { selector } from 'recoil';
import { loginDetailsState } from '../atoms/loginDetailsAtom';
/**
 * @returns whether you are logged in or not
 */
export const loginState = selector<boolean>({
  key: 'loginState',
  get: ({ get }) => {
    const loginDetails = get(loginDetailsState);
    return loginDetails ? true : false;
  },
});
