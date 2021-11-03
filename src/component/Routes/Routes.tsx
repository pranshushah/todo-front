import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { useRecoilValue } from 'recoil';
import { loginState } from '../../selector/loginStatus';
import { Home } from '../Home/Home';
import Important from '../ImportantContainer/ImportantContainer';
import LeftSidebar from '../LeftSidebar/LeftSidebar';
import MydayContainer from '../MydayContainer/MydayContainer';
import { Nav } from '../Nav/Nav';
import PlannedContainer from '../PlannedContainer/PlannedContainer';
import ProjectContainer from '../ProjectContainer/ProjectContainer';
import TaskContainer from '../TasksContainer/TaskContainer';

function LoggedInRoutesContainer({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LeftSidebar />
      {children}
    </>
  );
}

export function Routes() {
  const loggedIn = useRecoilValue(loginState);
  let routes: JSX.Element;
  if (!loggedIn) {
    routes = (
      <Switch>
        <Route exact component={Home} path={'/'} />
        <Redirect to={'/'} />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path={'/tasks'}>
          <LoggedInRoutesContainer>
            <TaskContainer />
          </LoggedInRoutesContainer>
        </Route>
        <Route path={'/myday'}>
          <LoggedInRoutesContainer>
            <MydayContainer />
          </LoggedInRoutesContainer>
        </Route>
        <Route path={'/planned'}>
          <LoggedInRoutesContainer>
            <PlannedContainer />
          </LoggedInRoutesContainer>
        </Route>
        <Route path={'/important'}>
          <Important />
        </Route>
        <Route path={'/project/:projectId'}>
          <LoggedInRoutesContainer>
            <ProjectContainer />
          </LoggedInRoutesContainer>
        </Route>
        <Redirect to='/tasks' />
      </Switch>
    );
  }
  return routes;
}
