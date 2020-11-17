import { normalTasksState } from '../../atoms/NormalTaskAtom';
import { planbedTasksState } from '../../atoms/plannedTasksState';
import { myDayState } from '../../atoms/MyDayTaskAtom';
import { ImpTasksState } from '../../atoms/ImportantTaskAtom';
import { useSetRecoilState } from 'recoil';
import {
  todoBody,
  todoType,
  plannedTodoBodyType,
  plannedTodoType,
  myDayTodoType,
  MydayTodoBodyType,
} from '../types';
import axios from 'axios';
import produce from 'immer';
import { useEffect } from 'react';
import { endOfDay } from 'date-fns';

export function useSetTaskOnLoad() {
  const setNormalTasks = useSetRecoilState(normalTasksState);
  const setPlannedTasks = useSetRecoilState(planbedTasksState);
  const setImpTasks = useSetRecoilState(ImpTasksState);
  const setMydayTasks = useSetRecoilState(myDayState);

  useEffect(
    () => {
      async function loadTasks() {
        const [res1, res2, res3, res4] = await Promise.allSettled([
          axios.get<todoBody[]>('/api/todo/getalltask'),
          axios.get<plannedTodoBodyType[]>('/api/todo/getalltaskwithduedate'),
          axios.get<todoBody[]>('/api/todo/getallimptask'),
          axios.get<MydayTodoBodyType[]>('/api/todo/getallmyday'),
        ]);
        if (
          res1.status === 'fulfilled' &&
          res2.status === 'fulfilled' &&
          res3.status === 'fulfilled' &&
          res4.status === 'fulfilled'
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
        }
      }
      loadTasks();
    }, // eslint-disable-next-line
    [],
  );
}
