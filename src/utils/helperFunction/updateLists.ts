import { op, todoType } from '../types';
import produce from 'immer';

/**
 *
 * @param todoList list of any type extending `todoType`
 * @param newTodo todo object extending `todoType`
 * @param ops tuple element of `op`
 *
 * @returns updated todo list of type `t`
 */

export function updatLists<t extends todoType>(
  todoList: t[],
  newTodo: t,
  ops: op,
) {
  if (ops === op.ADD) {
    return produce(todoList, (draft: t[]) => {
      draft.splice(0, 0, newTodo);
    });
  } else if (ops === op.UPDATE) {
    return produce(todoList, (draft: t[]) => {
      const replaceIndex = draft.findIndex((todo) => todo.id === newTodo.id);
      if (replaceIndex !== -1) {
        draft[replaceIndex] = newTodo;
      }
    });
  } else {
    return produce(todoList, (draft: t[]) => {
      const deleteIndex = draft.findIndex((todo) => todo.id === newTodo.id);
      if (deleteIndex > -1) {
        draft.splice(deleteIndex, 1);
      }
    });
  }
}
