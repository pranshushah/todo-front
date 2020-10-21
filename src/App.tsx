import React, { useState, useEffect } from 'react';
import Home from './component/Home/Home';
import axios from 'axios';
import Loading from './component/Loading/Loading';
import { userInfo } from './utils/types/userInfo';
import { loginDetailsState } from './atoms/loginDetailsAtom';
import { useRecoilState } from 'recoil';
enum status {
  SUCCESS = 'success',
  LOADING = 'loading',
  FAIL = 'fail',
}

function App() {
  const [userDetails, setUserDetails] = useRecoilState<null | userInfo>(
    loginDetailsState,
  );
  const [pageStatus, setPageStatus] = useState<status>(status.LOADING);

  useEffect(() => {
    async function getCurrentUser() {
      const res = await axios.get(`/api/current_user`);
      setUserDetails(res.data || null);
      setPageStatus(status.SUCCESS);
    }
    getCurrentUser();
  }, [setUserDetails]);
  console.log(userDetails);
  return <>{pageStatus === status.LOADING ? <Loading /> : <Home />}</>;
}

export default App;
