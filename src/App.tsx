import React, { useState, useEffect } from 'react';
import { Home } from './component/Home/Home.jsx';
import axios from 'axios';
import Loading from './component/UI/Loading/Loading.jsx';
import { userInfo } from './utils/types';
import { loginState } from './selector/loginStatus';
import { useSetTaskOnLoad } from './utils/customHooks/useSetTaskOnload';
import { loginDetailsState } from './atoms/loginDetailsAtom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Switch, Route, Redirect } from 'react-router-dom';
import TaskContainer from './component/TasksContainer/TaskContainer';
import MydayContainer from './component/MydayContainer/MydayContainer';
import PlannedContainer from './component/PlannedContainer/PlannedContainer';
import Important from './component/ImportantContainer/ImportantContainer';
import LeftSidebar from './component/LeftSidebar/LeftSidebar';
import NotificationList from './component/UI/NotificationList/NotificationList';
import ProjectContainer from './component/ProjectContainer/ProjectContainer';

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
  let routes = (
    <Switch>
      <Route exact component={Home} path={'/'} />
      <Redirect to={'/'} />
    </Switch>
  );
  if (loggedIn) {
    routes = (
      <Switch>
        <Route path={'/tasks'}>
          <TaskContainer />
        </Route>
        <Route path={'/myday'}>
          <MydayContainer />
        </Route>
        <Route path={'/planned'}>
          <PlannedContainer />
        </Route>
        <Route path={'/important'}>
          <Important />
        </Route>
        <Route path={'/project/:projectId'}>
          <ProjectContainer />
        </Route>
        <Redirect to='/tasks' />
      </Switch>
    );
  }

  return pageStatus === 'loading' ? (
    <Loading />
  ) : (
    <div className='app'>
      {loggedIn ? <LeftSidebar /> : null}
      {routes}
      <NotificationList />
    </div>
  );
}

export default App;
