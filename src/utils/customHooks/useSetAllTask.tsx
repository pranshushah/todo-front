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
  todoInProjectType,
  everyTodoType,
} from '../types';

/**
 * custom hook for syncing all todos in frontend after updating todo in backend
 */
export function useSetAllTask() {
  const normalTasks = useRecoilValue(normalTasksState);
  const plannedTasks = useRecoilValue(planbedTasksState);
  const impTasks = useRecoilValue(ImpTasksState);
  const mydayTasks = useRecoilValue(myDayState);
  const todoInProject = useRecoilValue(projectTasksAtom);
  const setAllTasks = useSetRecoilState(allTodos);
  const [selectedtodo, setTodo] = useRecoilState(selectedTodo);

  function updateAllTasks(
    todo: todoType | myDayTodoType | plannedTodoType | todoInProjectType,
    newTodo: todoType | myDayTodoType | plannedTodoType | todoInProjectType,
  ) {
    const updater: everyTodoType = {};
    if (newTodo.normalTask) {
      updater.normalTodos = updatLists<todoType>(
        normalTasks,
        newTodo,
        'update',
      );
    } else {
      if (newTodo.projectId) {
        // already checked for undefined
        updater.projectTodos = updatLists<todoInProjectType>(
          todoInProject, //@ts-ignore
          newTodo,
          'update',
        );
      }
    }
    if (newTodo.dueDate && !todo.dueDate) {
      updater.plannedTodos = updatLists<plannedTodoType>(
        plannedTasks,
        //@ts-ignore
        newTodo,
        'add',
      );
    }
    if (!newTodo.dueDate && todo.dueDate) {
      // already checked for undefined
      updater.plannedTodos = updatLists<plannedTodoType>(
        plannedTasks,
        //@ts-ignore
        newTodo,
        'delete',
      );
    }
    if (newTodo.dueDate && todo.dueDate) {
      // already checked for undefined
      updater.plannedTodos = updatLists<plannedTodoType>(
        plannedTasks,
        //@ts-ignore
        newTodo,
        'update',
      );
    }
    if (!todo.important && newTodo.important) {
      updater.impTodos = updatLists<todoType>(impTasks, newTodo, 'add');
    }
    if (todo.important && !newTodo.important) {
      updater.impTodos = updatLists<todoType>(impTasks, newTodo, 'delete');
    }
    if (todo.important && newTodo.important) {
      updater.impTodos = updatLists<todoType>(impTasks, newTodo, 'update');
    }
    if (todo.myDay && todo.myDay) {
      // already checked for undefined
      updater.myDayTodos = updatLists<myDayTodoType>(
        mydayTasks,
        //@ts-ignore
        newTodo,
        'update',
      );
    }
    if (!todo.myDay && newTodo.myDay) {
      // already checked for undefined
      updater.myDayTodos = updatLists<myDayTodoType>(
        mydayTasks,
        //@ts-ignore
        newTodo,
        'add',
      );
    }
    if (todo.myDay && !newTodo.myDay) {
      // already checked for undefined
      updater.myDayTodos = updatLists<myDayTodoType>(
        mydayTasks,
        //@ts-ignore
        newTodo,
        'delete',
      );
    }
    if (selectedtodo) {
      setTodo(newTodo);
    }
    setAllTasks(updater);
  }
  return updateAllTasks;
}
