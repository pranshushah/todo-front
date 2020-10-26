import { useSetRecoilState } from 'recoil';
import { plannedTodoType } from '../types/userInfo';
import { planbedTasksState } from '../../atoms/plannedTasksState';

export function useSetUpdatePlannedTasks() {
  const setPlannedTasksState = useSetRecoilState(planbedTasksState);
  function updater(newTodo: plannedTodoType) {
    setPlannedTasksState((todoList) => {
      const newTodoList = [...todoList];
      const replaceIndex = newTodoList.findIndex(
        (todo) => todo.id === newTodo.id,
      );
      if (replaceIndex !== -1) {
        newTodoList[replaceIndex] = newTodo;
      }
      return newTodoList;
    });
  }
  return updater;
}
