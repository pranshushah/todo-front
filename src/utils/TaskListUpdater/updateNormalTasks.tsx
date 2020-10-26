import { useSetRecoilState } from 'recoil';
import { normalTasksState } from '../../atoms/NormalTaskAtom';
import { todoType } from '../types/userInfo';

export function useSetUpdateNormalTasks() {
  const setNormalTodoList = useSetRecoilState(normalTasksState);
  function updater(newTodo: todoType) {
    setNormalTodoList((todoList) => {
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
