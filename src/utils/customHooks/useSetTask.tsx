import { useSetRecoilState, RecoilState } from 'recoil';
import { Op, todoType } from '../types';
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
  function updater(newTodo: t, operation: Op) {
    if (operation === 'update') {
      setTodoList((todoList) => updatLists<t>(todoList, newTodo, 'update'));
    } else if (operation === 'add') {
      setTodoList((todoList) => updatLists<t>(todoList, newTodo, 'add'));
    } else {
      setTodoList((todoList) => updatLists<t>(todoList, newTodo, 'delete'));
    }
  }
  return updater;
}
