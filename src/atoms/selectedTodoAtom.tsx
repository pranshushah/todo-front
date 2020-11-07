import { atom } from 'recoil';
import { todoType, plannedTodoType, myDayTodoType } from '../utils/types';
export const selectedTodo = atom<
  todoType | plannedTodoType | myDayTodoType | null
>({
  key: 'selectedTodoAtom',
  default: null,
});
