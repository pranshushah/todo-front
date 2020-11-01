import { useSetRecoilState, RecoilState } from 'recoil';
import { op, todoType, plannedTodoType, myDayTodoType } from '../types';

export function useSetTasks<
  t extends todoType | plannedTodoType | myDayTodoType
>(recoilState: RecoilState<t[]>) {
  const setTodoList = useSetRecoilState<t[]>(recoilState);
  function updater(newTodo: t, operation: op) {
    if (operation === op.UPDATE) {
      setTodoList((todoList) => {
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
      setTodoList((todoList) => {
        const newTodoList = [...todoList];
        newTodoList.splice(0, 0, newTodo);
        return newTodoList;
      });
    } else {
      setTodoList((todoList) => {
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
