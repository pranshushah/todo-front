import { atom } from 'recoil';
import { todoType, plannedTodoType, myDayTodoType } from '../utils/types';
/**
 * atom containing selected todo for atom details
 */
export const selectedTodo = atom<
  todoType | plannedTodoType | myDayTodoType | null
>({
  key: 'selectedTodoAtom',
  default: null,
});
