import React, { useState, useEffect } from 'react';
import Home from './component/Home/Home';
import axios from 'axios';
import Loading from './component/Loading/Loading';
import { userInfo } from './utils/types/userInfo';
import { loginState } from './selector/loginStatus';
import { loginDetailsState } from './atoms/loginDetailsAtom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Switch, Route, Redirect } from 'react-router-dom';
import TaskContainer from './component/TasksContainer/TaskContainer';
import MydayContainer from './component/MydayContainer/MydayContainer';
import PlannedContainer from './component/PlannedContainer/PlannedContainer';
import Important from './component/ImportantContainer/ImportantContainer';
import LeftSidebar from './component/LeftSidebar/LeftSidebar';
enum status {
  SUCCESS = 'success',
  LOADING = 'loading',
  FAIL = 'fail',
}

function App() {
  const setUserDetails = useSetRecoilState<null | userInfo>(loginDetailsState);
  const loggedIn = useRecoilValue(loginState);
  const [pageStatus, setPageStatus] = useState<status>(status.LOADING);
  useEffect(() => {
    async function getCurrentUser() {
      const res = await axios.get(`/api/current_user`);
      setUserDetails(res.data || null);
      setPageStatus(status.SUCCESS);
    }
    getCurrentUser();
  }, [setUserDetails]);
  let routes = (
    <Switch>
      <Route exact component={Home} path={'/'} />
      <Redirect to={'/'} />
    </Switch>
  );
  if (loggedIn) {
    routes = (
      <Switch>
        <Route exact component={TaskContainer} path={'/tasks'} />
        <Route exact component={MydayContainer} path={'/myday'} />
        <Route exact component={PlannedContainer} path={'/planned'} />
        <Route exact component={Important} path={'/important'} />
        <Redirect to={'/tasks'} />
      </Switch>
    );
  }

  return pageStatus === status.LOADING ? (
    <Loading />
  ) : (
    <div className='app'>
      <LeftSidebar />
      {routes}
    </div>
  );
}

export default App;
