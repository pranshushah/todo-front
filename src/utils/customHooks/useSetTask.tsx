import { useSetRecoilState, RecoilState } from 'recoil';
import { op, todoType } from '../types';
import { updatLists } from '../helperFunction/updateLists';
export function useSetTasks<t extends todoType>(recoilState: RecoilState<t[]>) {
  const setTodoList = useSetRecoilState<t[]>(recoilState);
  function updater(newTodo: t, operation: op) {
    if (operation === op.UPDATE) {
      setTodoList((todoList) => updatLists<t>(todoList, newTodo, op.UPDATE));
    } else if (operation === op.ADD) {
      setTodoList((todoList) => updatLists<t>(todoList, newTodo, op.ADD));
    } else {
      setTodoList((todoList) => updatLists<t>(todoList, newTodo, op.Del));
    }
  }
  return updater;
}
