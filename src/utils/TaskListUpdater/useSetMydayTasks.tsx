import { useSetRecoilState } from 'recoil';
import { myDayState } from '../../atoms/MyDayTaskAtom';
import { op, myDayTodoType } from '../types/userInfo';

export function useSetMydayTasks() {
  const setNormalTodoList = useSetRecoilState(myDayState);
  function updater(newTodo: myDayTodoType, operation: op) {
    if (operation === op.UPDATE) {
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
    } else if (operation === op.ADD) {
      setNormalTodoList((todoList) => {
        const newTodoList = [...todoList];
        newTodoList.splice(0, 0, newTodo);
        return newTodoList;
      });
    } else {
      setNormalTodoList((todoList) => {
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
