import { normalTasksState } from '../../atoms/NormalTaskAtom';
import { planbedTasksState } from '../../atoms/plannedTasksState';
import { myDayState } from '../../atoms/MyDayTaskAtom';
import { ImpTasksState } from '../../atoms/ImportantTaskAtom';
import { projects } from '../../atoms/allProjectAtom';
import { projectTasksAtom } from '../../atoms/todoInProjects';
import { useSetRecoilState } from 'recoil';
import {
  todoBody,
  todoType,
  plannedTodoBodyType,
  plannedTodoType,
  myDayTodoType,
  MydayTodoBodyType,
  project,
  todoBodyInProjectType,
  todoInProjectType,
} from '../types';
import axios from '../../axios';
import produce from 'immer';
import { useEffect } from 'react';
import { endOfDay } from 'date-fns';
import { useSetNotification } from './useAddNotification';
import { useRecoilValue } from 'recoil';
import { loginState } from '../../selector/loginStatus';

/**
 * custom hooks that will fetch all the todos concurrently when you are logged in.
 */
export function useSetTaskOnLoad() {
  const setNormalTasks = useSetRecoilState(normalTasksState);
  const setPlannedTasks = useSetRecoilState(planbedTasksState);
  const setImpTasks = useSetRecoilState(ImpTasksState);
  const setMydayTasks = useSetRecoilState(myDayState);
  const setProjects = useSetRecoilState(projects);
  const setTasksInProject = useSetRecoilState(projectTasksAtom);
  const { addNotification } = useSetNotification();
  const loggedIn = useRecoilValue(loginState);
  useEffect(
    () => {
      async function loadTasks() {
        try {
          if (loggedIn) {
            if (window.navigator.onLine) {
              const [res1, res2, res3, res4, res5, res6] =
                await Promise.allSettled([
                  axios.get<todoBody[]>('/api/todo/getalltask', {
                    timeoutErrorMessage: 'We were unable to get all todo',
                  }),
                  axios.get<plannedTodoBodyType[]>(
                    '/api/todo/getalltaskwithduedate',
                    {
                      timeoutErrorMessage:
                        'We were unable to get all Planned todo',
                    },
                  ),
                  axios.get<todoBody[]>('/api/todo/getallimptask', {
                    timeoutErrorMessage:
                      'We were unable to get all important todo',
                  }),
                  axios.get<MydayTodoBodyType[]>('/api/todo/getallmyday', {
                    timeoutErrorMessage: 'We were unable to my Day todo',
                  }),
                  axios.get<project[]>('/api/project/getall', {
                    timeoutErrorMessage: 'We were unable to my Day todo',
                  }),
                  axios.get<todoBodyInProjectType[]>(
                    '/api/project/getalltask',
                    {
                      timeoutErrorMessage: 'We were unable to my Day todo',
                    },
                  ),
                ]);
              if (
                res1.status === 'fulfilled' &&
                res2.status === 'fulfilled' &&
                res3.status === 'fulfilled' &&
                res4.status === 'fulfilled' &&
                res5.status === 'fulfilled' &&
                res6.status === 'fulfilled'
              ) {
                if (res1.value.status === 200) {
                  const newTodoList: todoType[] = produce(
                    res1.value.data,
                    (draft) => {
                      const todoList: todoType[] = draft.map((todo) => {
                        if (todo.dueDate) {
                          return {
                            ...todo,
                            createdAt: new Date(todo.createdAt),
                            dueDate: endOfDay(new Date(todo.dueDate)),
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
                    },
                  );
                  setNormalTasks(newTodoList);
                }
                if (res2.value.status === 200) {
                  const newTodoList: plannedTodoType[] = produce(
                    res2.value.data,
                    (draft) => {
                      const todoList = draft.map((todo) => {
                        return {
                          ...todo,
                          createdAt: new Date(todo.createdAt),
                          dueDate: endOfDay(new Date(todo.dueDate)),
                        };
                      });
                      return todoList.sort((a, b) => {
                        return b.createdAt.getTime() - a.createdAt.getTime();
                      });
                    },
                  );
                  setPlannedTasks(newTodoList);
                }
                if (res3.value.status === 200) {
                  const newTodoList: todoType[] = produce(
                    res3.value.data,
                    (draft) => {
                      const todoList: todoType[] = draft.map((todo) => {
                        if (todo.dueDate) {
                          return {
                            ...todo,
                            createdAt: new Date(todo.createdAt),
                            dueDate: endOfDay(new Date(todo.dueDate)),
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
                    },
                  );
                  setImpTasks(newTodoList);
                }
                if (res4.value.status === 200) {
                  const newTodoList: myDayTodoType[] = produce(
                    res4.value.data,
                    (draft) => {
                      const todoList: myDayTodoType[] = draft.map((todo) => {
                        if (todo.dueDate) {
                          return {
                            ...todo,
                            createdAt: new Date(todo.createdAt),
                            dueDate: endOfDay(new Date(todo.dueDate)),
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
                    },
                  );
                  setMydayTasks(newTodoList);
                }
                if (res5.value.status === 200) {
                  setProjects(res5.value.data);
                }
                if (res6.value.status === 200) {
                  const newTodoList: todoInProjectType[] = produce(
                    res6.value.data,
                    (draft) => {
                      const todoList: todoInProjectType[] = draft.map(
                        (todo) => {
                          if (todo.dueDate) {
                            return {
                              ...todo,
                              createdAt: new Date(todo.createdAt),
                              dueDate: endOfDay(new Date(todo.dueDate)),
                            };
                          } else {
                            return {
                              ...todo,
                              createdAt: new Date(todo.createdAt),
                              dueDate: undefined,
                            };
                          }
                        },
                      );
                      return todoList.sort((a, b) => {
                        return b.createdAt.getTime() - a.createdAt.getTime();
                      });
                    },
                  );
                  setTasksInProject(newTodoList);
                }
              }
            } else {
              throw new Error('No internet connection');
            }
          }
        } catch (e) {
          addNotification(e.message, 'NetWork Error');
        }
      }
      loadTasks();
    }, // eslint-disable-next-line
    [loggedIn],
  );
}
