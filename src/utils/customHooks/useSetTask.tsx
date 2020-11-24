import { useSetRecoilState, RecoilState } from 'recoil';
import { op, todoType } from '../types';
import produce from 'immer';

export function useSetTasks<t extends todoType>(recoilState: RecoilState<t[]>) {
  const setTodoList = useSetRecoilState<t[]>(recoilState);
  function updater(newTodo: t, operation: op) {
    if (operation === op.UPDATE) {
      setTodoList((todoList) => {
        const newTodoList = produce(todoList, (draft: t[]) => {
          const replaceIndex = draft.findIndex(
            (todo) => todo.id === newTodo.id,
          );
          if (replaceIndex !== -1) {
            draft[replaceIndex] = newTodo;
          }
        });
        return newTodoList;
      });
    } else if (operation === op.ADD) {
      setTodoList((todoList) => {
        const newTodoList = produce(todoList, (draft: t[]) => {
          draft.splice(0, 0, newTodo);
        });
        return newTodoList;
      });
    } else {
      setTodoList((todoList) => {
        const newTodoList = produce(todoList, (draft) => {
          const deleteIndex = draft.findIndex((todo) => todo.id === newTodo.id);
          if (deleteIndex > -1) {
            draft.splice(deleteIndex, 1);
          }
        });
        return newTodoList;
      });
    }
  }
  return updater;
}
