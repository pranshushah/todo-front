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
  myDayTodoType,
  MydayTodoBodyType,
} from './utils/types';
import produce from 'immer';
import { loginState } from './selector/loginStatus';
import { loginDetailsState } from './atoms/loginDetailsAtom';
import { normalTasksState } from './atoms/NormalTaskAtom';
import { planbedTasksState } from './atoms/plannedTasksState';
import { myDayState } from './atoms/MyDayTaskAtom';
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
  const setMydayTasks = useSetRecoilState(myDayState);
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
          const newTodoList: todoType[] = produce(res.data, (draft) => {
            const todoList: todoType[] = draft.map((todo) => {
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
            return todoList.sort((a, b) => {
              return b.createdAt.getTime() - a.createdAt.getTime();
            });
          });
          setNormalTasks(newTodoList);
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
          const newTodoList: plannedTodoType[] = produce(res.data, (draft) => {
            const todoList = draft.map((todo) => {
              return {
                ...todo,
                createdAt: new Date(todo.createdAt),
                dueDate: new Date(todo.createdAt),
              };
            });
            return todoList.sort((a, b) => {
              return b.createdAt.getTime() - a.createdAt.getTime();
            });
          });
          setPlannedTasks(newTodoList);
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
          const newTodoList: todoType[] = produce(res.data, (draft) => {
            const todoList: todoType[] = draft.map((todo) => {
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
            return todoList.sort((a, b) => {
              return b.createdAt.getTime() - a.createdAt.getTime();
            });
          });
          setImpTasks(newTodoList);
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
        const res = await axios.get<MydayTodoBodyType[]>(
          '/api/todo/getallmyday',
        );
        if (res.status === 200) {
          const newTodoList: myDayTodoType[] = produce(res.data, (draft) => {
            const todoList: myDayTodoType[] = draft.map((todo) => {
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
            return todoList.sort((a, b) => {
              return b.createdAt.getTime() - a.createdAt.getTime();
            });
          });
          setMydayTasks(newTodoList);
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
        <Route path='*'>
          <TaskContainer />
        </Route>
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
