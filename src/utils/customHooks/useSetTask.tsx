import { useSetRecoilState, RecoilState } from 'recoil';
import { op, todoType } from '../types';
import { updatLists } from '../helperFunction/updateLists';
/**
 * custom hook for updating todos.
 * @param recoilState recoil atom
 * @returns todo list setter function
 */
export function useSetTasks<t extends todoType>(recoilState: RecoilState<t[]>) {
  const setTodoList = useSetRecoilState<t[]>(recoilState);
  /**
   *
   * @param newTodo todo you want to update in todo list
   * @param operation what kind of operation you want to perform.
   */
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
