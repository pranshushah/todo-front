import React, { useState, useCallback } from 'react';
import Styles from './ProjectContainer.module.scss';
import { useParams, useHistory } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
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
import dots from '../../utils/svg/dots-horizontal.svg';
import ProjectMenu from './ProjectMenu/ProjectMenu';
import produce from 'immer';

type paramTypes = {
  projectId: string;
};

function ProjectContainer() {
  const { projectId } = useParams<paramTypes>();
  const history = useHistory();
  const [allProjects, setAllProject] = useRecoilState(projects);
  const { addNotification } = useSetNotification();
  const setTasksInProject = useSetTasks(projectTasksAtom);
  const setTasksAfterDeleteingProject = useSetRecoilState(projectTasksAtom);
  const [showMenu, setShowMenu] = useState(false);

  const selectedProject = allProjects.find(
    (project) => project.id === projectId,
  );

  async function ProjectDeleteHandler() {
    try {
      const res = await axios.request({
        method: 'DELETE',
        url: '/api/project',
        data: { projectId },
        timeout: 9000,
        timeoutErrorMessage: 'We were unable to add todo',
      });
      if (res.status === 200) {
        setAllProject((projectList) =>
          produce(projectList, (draft) => {
            const deleteIndex = draft.findIndex(
              (project) => project.id === projectId,
            );
            if (deleteIndex > 0) {
              draft.splice(deleteIndex, 1);
            }
          }),
        );
        setTasksAfterDeleteingProject((tasks) =>
          produce(tasks, (draft) => {
            return draft.filter((task) => task.projectId !== projectId);
          }),
        );
        history.replace('/tasks');
      }
    } catch (e) {
      addNotification(e.message, 'NetWork Error');
    }
  }

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

  function toggleMenu() {
    setShowMenu((show) => !show);
  }

  const outSideClickHandler = useCallback(function clickOutSideHandler() {
    setShowMenu(false);
  }, []);

  return (
    <div className={Styles.container}>
      <header>
        <Header title={selectedProject ? selectedProject.projectName : ''} />
        <span className={Styles.imgContainer} onClick={toggleMenu}>
          <img src={dots} alt='' />
          <ProjectMenu
            show={showMenu}
            onClickOutside={outSideClickHandler}
            onClickDelete={ProjectDeleteHandler}
          />
        </span>
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
