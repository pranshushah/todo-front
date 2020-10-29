import { useSetRecoilState } from 'recoil';
import { todoType, op } from '../types/userInfo';
import { ImpTasksState } from '../../atoms/ImportantTaskAtom';

export function useSetImpTasks() {
  const setImpTasksState = useSetRecoilState(ImpTasksState);
  function updater(newTodo: todoType, operation: op) {
    if (operation === op.UPDATE) {
      setImpTasksState((todoList) => {
        const newTodoList = [...todoList];
        const replaceIndex = newTodoList.findIndex(
          (todo) => todo.id === newTodo.id,
        );
        if (replaceIndex !== -1) {
          newTodoList[replaceIndex] = newTodo;
        }
        return newTodoList;
      });
    } else if (operation === op.ADD) {
      setImpTasksState((todoList) => {
        const newTodoList = [...todoList];
        newTodoList.splice(0, 0, newTodo);
        return newTodoList;
      });
    } else {
      setImpTasksState((todoList) => {
        const newTodoList = [...todoList];
        const deleteIndex = newTodoList.findIndex(
          (todo) => todo.id === newTodo.id,
        );
        if (deleteIndex > -1) {
          newTodoList.splice(deleteIndex, 1);
        }
        return newTodoList;
      });
    }
  }
  return updater;
}
