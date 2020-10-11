import React, { useState, useEffect } from 'react';
import Home from './component/Home/Home';
import axios from 'axios';
import Loading from './component/Loading/Loading';
import { UserProvider } from './Context/userContext';
import { userInfo } from './utils/types/userInfo';
enum status {
  SUCCESS = 'success',
  LOADING = 'loading',
  FAIL = 'fail',
}
function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState<null | userInfo>(null);
  const [pageStatus, setPageStatus] = useState<status>(status.LOADING);
  useEffect(() => {
    async function getCurrentUser() {
      try {
        const res = await axios.get(`/api/current_user`);
        setLoggedIn(res.data ? true : false);
        setUserDetails(res.data || null);
        setPageStatus(status.SUCCESS);
      } catch (e) {
        console.error(e);
      }
    }
    getCurrentUser();
  }, []);
  console.log(userDetails);
  return (
    <>
      <UserProvider value={{ loggedIn, userDetails }}>
        {pageStatus === status.LOADING ? <Loading /> : <Home />}
      </UserProvider>
    </>
  );
}

export default App;
