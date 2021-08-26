import { selectorFamily } from 'recoil';
import { projectTasksAtom } from '../atoms/todoInProjects';
import { TaskStatus, todoInProjectType } from '../utils/types';

type getParams = {
  projectId: string;
  taskdone: TaskStatus;
};
/**
 * you can get tasks in given project by their status
 */
export const tasksInGivenProject = selectorFamily<
  todoInProjectType[],
  getParams
>({
  key: 'tasksInGivenProject',
  get:
    ({ projectId, taskdone }) =>
    ({ get }) => {
      const tasks = get(projectTasksAtom);
      if (taskdone === 'COMPLETED') {
        const projectTasks = tasks.filter((task) => {
          return task.projectId === projectId && task.done;
        });
        return projectTasks;
      } else {
        const projectTasks = tasks.filter((task) => {
          return task.projectId === projectId && !task.done;
        });
        return projectTasks;
      }
    },
});
