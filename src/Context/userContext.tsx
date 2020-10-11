import React from 'react';
import { userInfo } from '../utils/types/userInfo';
interface userContextInterface {
  loggedIn: boolean;
  userDetails: userInfo | null;
  setLoggedIn?: Function;
  setUserDetails?: Function;
}

const userContext = React.createContext<userContextInterface>({
  loggedIn: false,
  userDetails: null,
});
const UserProvider = userContext.Provider;
export { userContext as default, UserProvider };
