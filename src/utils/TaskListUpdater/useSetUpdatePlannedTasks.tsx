import { useSetRecoilState } from 'recoil';
import { plannedTodoType, op } from '../types/userInfo';
import { planbedTasksState } from '../../atoms/plannedTasksState';

export function useSetUpdatePlannedTasks() {
  const setPlannedTasksState = useSetRecoilState(planbedTasksState);
  function updater(newTodo: plannedTodoType, operation: op) {
    if (operation === op.UPDATE) {
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
    } else if (operation === op.ADD) {
      setPlannedTasksState((todoList) => {
        const newTodoList = [...todoList];
        newTodoList.splice(0, 0, newTodo);
        return newTodoList;
      });
    }
  }
  return updater;
}
