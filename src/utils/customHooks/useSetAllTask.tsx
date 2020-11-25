import { ImpTasksState } from '../../atoms/ImportantTaskAtom';
import { myDayState } from '../../atoms/MyDayTaskAtom';
import { normalTasksState } from '../../atoms/NormalTaskAtom';
import { planbedTasksState } from '../../atoms/plannedTasksState';
import { projectTasksAtom } from '../../atoms/todoInProjects';
import { allTodos } from '../../selector/allTodos';
import { useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil';
import { updatLists } from '../helperFunction/updateLists';
import { selectedTodo } from '../../atoms/selectedTodoAtom';
import {
  todoType,
  myDayTodoType,
  plannedTodoType,
  op,
  todoInProjectType,
  everyTodoType,
} from '../types';

export function useSetAllTask() {
  const normalTasks = useRecoilValue(normalTasksState);
  const plannedTasks = useRecoilValue(planbedTasksState);
  const impTasks = useRecoilValue(ImpTasksState);
  const mydayTasks = useRecoilValue(myDayState);
  const todoInProject = useRecoilValue(projectTasksAtom);
  const setAllTasks = useSetRecoilState(allTodos);
  const [todo, setTodo] = useRecoilState(selectedTodo);

  function updateAllTasks(
    todo: todoType | myDayTodoType | plannedTodoType | todoInProjectType,
    newTodo: todoType | myDayTodoType | plannedTodoType | todoInProjectType,
  ) {
    const updater: everyTodoType = {};
    if (newTodo.normalTask) {
      updater.normalTodos = updatLists<todoType>(
        normalTasks,
        newTodo,
        op.UPDATE,
      );
    } else {
      if (newTodo.projectId) {
        // already checked for undefined
        updater.projectTodos = updatLists<todoInProjectType>(
          todoInProject, //@ts-ignore
          newTodo,
          op.UPDATE,
        );
      }
    }
    if (newTodo.dueDate) {
      // already checked for undefined
      updater.plannedTodos = updatLists<plannedTodoType>(
        plannedTasks,
        //@ts-ignore
        newTodo,
        op.UPDATE,
      );
    }
    if (!todo.important && newTodo.important) {
      console.log(op.ADD);
      updater.impTodos = updatLists<todoType>(impTasks, newTodo, op.ADD);
    }
    if (todo.important && !newTodo.important) {
      console.log(op.Del);
      updater.impTodos = updatLists<todoType>(impTasks, newTodo, op.Del);
    }
    if (todo.important && newTodo.important) {
      console.log(op.UPDATE);
      updater.impTodos = updatLists<todoType>(impTasks, newTodo, op.UPDATE);
    }
    if (todo.myDay && todo.myDay) {
      // already checked for undefined
      updater.myDayTodos = updatLists<myDayTodoType>(
        mydayTasks,
        //@ts-ignore
        newTodo,
        op.UPDATE,
      );
    }
    if (!todo.myDay && newTodo.myDay) {
      // already checked for undefined
      updater.myDayTodos = updatLists<myDayTodoType>(
        mydayTasks,
        //@ts-ignore
        newTodo,
        op.ADD,
      );
    }
    if (todo.myDay && !newTodo.myDay) {
      // already checked for undefined
      updater.myDayTodos = updatLists<myDayTodoType>(
        mydayTasks,
        //@ts-ignore
        newTodo,
        op.Del,
      );
    }
    if (todo) {
      setTodo(newTodo);
    }
    setAllTasks(updater);
  }
  return updateAllTasks;
}
