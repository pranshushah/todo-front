import { selector } from 'recoil';
import { selectedTodo } from '../atoms/selectedTodoAtom';
/**
 * info about selected todo
 */
export const selctedTodo = selector<boolean>({
  key: 'selctedTodo',
  get: ({ get }) => {
    const selctedTodo = get(selectedTodo);
    return selctedTodo ? true : false;
  },
});
