import React from 'react';
import Styles from './ProjectContainer.module.scss';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useSetTasks } from '../../utils/customHooks/useSetTask';
import { projects } from '../../atoms/allProjectAtom';
import Header from '../UI/Header/Header';
import AddTodo from '../AddTodo/AddTodo';
import axios from 'axios';
import { useSetNotification } from '../../utils/customHooks/useAddNotification';
import { todoBodyInProjectType, op } from '../../utils/types';
import TodoList from './TodoList/TodoList';
import CompletedTodoList from './CompletedTodoList/CompletedTodoList';
import { projectTasksAtom } from '../../atoms/todoInProjects';

type paramTypes = {
  projectId: string;
};

function ProjectContainer() {
  const { projectId } = useParams<paramTypes>();
  const allProjects = useRecoilValue(projects);
  const { addNotification } = useSetNotification();
  const setTasksInProject = useSetTasks(projectTasksAtom);

  const selectedProject = allProjects.find(
    (project) => project.id === projectId,
  );

  async function AddTodoHandler(todoTitle: string) {
    try {
      if (window.navigator.onLine) {
        const res = await axios.post<todoBodyInProjectType>(
          '/api/todo/new',
          {
            todoTitle,
            projectId: projectId,
          },
          { timeout: 9000, timeoutErrorMessage: 'We were unable to add todo' },
        );
        if (res.status === 200) {
          const newTodo = {
            ...res.data,
            createdAt: new Date(res.data.createdAt),
            dueDate: undefined,
          };
          setTasksInProject(newTodo, op.ADD);
        }
      } else {
        throw new Error('No internet connection');
      }
    } catch (e) {
      addNotification(e.message, 'NetWork Error');
    }
  }

  return (
    <div className={Styles.container}>
      <header>
        <Header
          title={selectedProject ? selectedProject.projectName : ''}
        ></Header>
        <AddTodo placeholder='Add a Task' onAddTodo={AddTodoHandler} />
      </header>
      <main>
        <TodoList projectId={projectId} />
        <CompletedTodoList projectId={projectId} />
      </main>
    </div>
  );
}

export default ProjectContainer;
