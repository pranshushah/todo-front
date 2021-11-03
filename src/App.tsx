import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from './component/UI/Loading/Loading.jsx';
import { userInfo } from './utils/types';
import { loginState } from './selector/loginStatus';
import { useSetTaskOnLoad } from './utils/customHooks/useSetTaskOnload';
import { loginDetailsState } from './atoms/loginDetailsAtom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import NotificationList from './component/UI/NotificationList/NotificationList';
import { Routes } from './component/Routes/Routes';
import { Nav } from './component/Nav/Nav';

function App() {
  const setUserDetails = useSetRecoilState<null | userInfo>(loginDetailsState);
  const loggedIn = useRecoilValue(loginState);
  const [pageStatus, setPageStatus] = useState<'success' | 'loading' | 'fail'>(
    'loading',
  );
  useSetTaskOnLoad();
  useEffect(
    () => {
      async function getCurrentUser() {
        const res = await axios.get(`/api/current_user`);
        setUserDetails(res.data || null);
        setPageStatus('success');
      }
      getCurrentUser();
    }, // eslint-disable-next-line
    [],
  );

  return pageStatus === 'loading' ? (
    <Loading />
  ) : (
    <>
      {loggedIn ? <Nav /> : null}
      <div className='app'>
        <Routes />
        <NotificationList />
      </div>
    </>
  );
}

export default App;
