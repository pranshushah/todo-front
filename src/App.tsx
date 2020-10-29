import React, { useState, useEffect } from 'react';
import Home from './component/Home/Home';
import axios from 'axios';
import Loading from './component/Loading/Loading';
import {
  userInfo,
  todoBody,
  todoType,
  plannedTodoBodyType,
  plannedTodoType,
} from './utils/types/userInfo';
import { loginState } from './selector/loginStatus';
import { loginDetailsState } from './atoms/loginDetailsAtom';
import { normalTasksState } from './atoms/NormalTaskAtom';
import { planbedTasksState } from './atoms/plannedTasksState';
import { ImpTasksState } from './atoms/ImportantTaskAtom';
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
  const setNormalTasks = useSetRecoilState(normalTasksState);
  const setPlannedTasks = useSetRecoilState(planbedTasksState);
  const setImpTasks = useSetRecoilState(ImpTasksState);
  const loggedIn = useRecoilValue(loginState);
  const [pageStatus, setPageStatus] = useState<status>(status.LOADING);
  useEffect(
    () => {
      async function getCurrentUser() {
        const res = await axios.get(`/api/current_user`);
        setUserDetails(res.data || null);
        setPageStatus(status.SUCCESS);
      }
      getCurrentUser();
    }, // eslint-disable-next-line
    [],
  );
  //getting all normal tasks
  useEffect(
    () => {
      async function getTodos() {
        const res = await axios.get<todoBody[]>('/api/todo/getalltask');
        if (res.status === 200) {
          const newTodoList: todoType[] = res.data.map((todo) => {
            if (todo.dueDate) {
              return {
                ...todo,
                createdAt: new Date(todo.createdAt),
                dueDate: new Date(todo.dueDate),
              };
            } else {
              return {
                ...todo,
                createdAt: new Date(todo.createdAt),
                dueDate: undefined,
              };
            }
          });
          const sortedTodoList = newTodoList.sort((a, b) => {
            return b.createdAt.getTime() - a.createdAt.getTime();
          });
          setNormalTasks(sortedTodoList);
        }
      }
      getTodos();
    }, // eslint-disable-next-line
    [],
  );
  //getting planned tasks
  useEffect(
    () => {
      async function getTodos() {
        const res = await axios.get<plannedTodoBodyType[]>(
          '/api/todo/getalltaskwithduedate',
        );
        if (res.status === 200) {
          const newTodoList: plannedTodoType[] = res.data.map((todo) => {
            return {
              ...todo,
              createdAt: new Date(todo.createdAt),
              dueDate: new Date(todo.createdAt),
            };
          });
          const sortedTodoList = newTodoList.sort((a, b) => {
            return b.createdAt.getTime() - a.createdAt.getTime();
          });
          setPlannedTasks(sortedTodoList);
        }
      }
      getTodos();
    }, // eslint-disable-next-line
    [],
  );

  //getting imp tasks
  useEffect(
    () => {
      async function getTodos() {
        const res = await axios.get<todoBody[]>('/api/todo/getallimptask');
        if (res.status === 200) {
          const newTodoList: todoType[] = res.data.map((todo) => {
            if (todo.dueDate) {
              return {
                ...todo,
                createdAt: new Date(todo.createdAt),
                dueDate: new Date(todo.dueDate),
              };
            } else {
              return {
                ...todo,
                createdAt: new Date(todo.createdAt),
                dueDate: undefined,
              };
            }
          });
          const sortedTodoList = newTodoList.sort((a, b) => {
            return b.createdAt.getTime() - a.createdAt.getTime();
          });
          setImpTasks(sortedTodoList);
        }
      }
      getTodos();
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
