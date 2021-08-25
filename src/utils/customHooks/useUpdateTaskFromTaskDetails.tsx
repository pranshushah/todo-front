import { useSetRecoilState } from 'recoil';
import { selectedTodo } from '../../atoms/selectedTodoAtom';
import { useSetAllTask } from './useSetAllTask';
import { todoBody, todoType } from '../types';
import { endOfDay } from 'date-fns';
type From = 'todoType' | 'todoBody';
/**
 * sync your changes from details to all todo container
 */
export function useSetTaskFromTaskDetails() {
  const setTodo = useSetRecoilState(selectedTodo);
  const updateAllTasks = useSetAllTask();

  function updater(
    todo: todoType,
    updateTodo: todoBody | todoType,
    from: From = 'todoType',
  ) {
    if (from === 'todoBody') {
      if (updateTodo.dueDate) {
        const newTodo = {
          ...updateTodo,
          createdAt: new Date(updateTodo.createdAt),
          dueDate: endOfDay(new Date(updateTodo.dueDate)),
        };
        updateAllTasks(todo, newTodo);
        setTodo(newTodo);
      } else {
        const newTodo = {
          ...updateTodo,
          createdAt: new Date(updateTodo.createdAt),
          dueDate: undefined,
        };
        updateAllTasks(todo, newTodo);
        setTodo(newTodo);
      }
    } else {
      // @ts-ignore
      updateAllTasks(todo, updateTodo);
      // @ts-ignore
      setTodo(updateTodo);
    }
  }

  return updater;
}
