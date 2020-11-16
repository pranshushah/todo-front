import { useSetRecoilState } from 'recoil';
import { selectedTodo } from '../../atoms/selectedTodoAtom';
import { useSetAllTask } from './useSetAllTask';
import { todoBody, todoType } from '../types';

export function useSetTaskFromTaskDetails() {
  const setTodo = useSetRecoilState(selectedTodo);
  const updateAllTasks = useSetAllTask();

  function updater(todo: todoType, todobody: todoBody) {
    if (todobody.dueDate) {
      const newTodo = {
        ...todobody,
        createdAt: new Date(todobody.createdAt),
        dueDate: new Date(todobody.dueDate),
      };
      updateAllTasks(todo, newTodo);
      setTodo(newTodo);
    } else {
      const newTodo = {
        ...todobody,
        createdAt: new Date(todobody.createdAt),
        dueDate: undefined,
      };
      updateAllTasks(todo, newTodo);
      setTodo(newTodo);
    }
  }

  return updater;
}
