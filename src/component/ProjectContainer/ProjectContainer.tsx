import React, { useState, useCallback, useEffect } from 'react';
import Styles from './ProjectContainer.module.scss';
import { useParams, useHistory } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useSetTasks } from '../../utils/customHooks/useSetTask';
import { projects } from '../../atoms/allProjectAtom';
import AddTodo from '../AddTodo/AddTodo';
import axios from '../../axios';
import { useSetNotification } from '../../utils/customHooks/useAddNotification';
import { todoBodyInProjectType } from '../../utils/types';
import TodoList from './TodoList/TodoList';
import CompletedTodoList from './CompletedTodoList/CompletedTodoList';
import { projectTasksAtom } from '../../atoms/todoInProjects';
import dots from '../../utils/svg/dots-horizontal.svg';
import ProjectMenu from './ProjectMenu/ProjectMenu';
import produce from 'immer';
import ProjectTitle from './ProjectTitle';
import Header from '../UI/Header/Header';

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
  const [showInput, setShowInput] = useState(false);

  const selectedProject = allProjects.find(
    (project) => project.id === projectId,
  );
  if (!selectedProject) {
    history.replace('/tasks');
  }
  const [projectName, setProjectName] = useState(selectedProject?.projectName);

  useEffect(() => {
    setProjectName(selectedProject?.projectName);
  }, [selectedProject?.projectName]);

  async function ProjectDeleteHandler() {
    try {
      const res = await axios.request({
        method: 'DELETE',
        url: '/api/project',
        data: { projectId },
        timeoutErrorMessage: 'We were unable to delete todo',
      });
      if (res.status === 200) {
        setAllProject((projectList) =>
          produce(projectList, (draft) => {
            const deleteIndex = draft.findIndex(
              (project) => project.id === projectId,
            );
            if (deleteIndex > -1) {
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
          { timeoutErrorMessage: 'We were unable to add todo' },
        );
        if (res.status === 200) {
          const newTodo = {
            ...res.data,
            createdAt: new Date(res.data.createdAt),
            dueDate: undefined,
          };
          setTasksInProject(newTodo, 'add');
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

  function inputChangeHandler(val: string) {
    setProjectName(val);
  }

  function showInputHandler() {
    setShowInput(true);
  }

  function hideInputHandler() {
    setShowInput(false);
  }

  return (
    <div className={Styles.container}>
      <header>
        {showInput ? (
          <ProjectTitle
            inputValue={projectName}
            onChangeInput={inputChangeHandler}
            initialInputValue={selectedProject?.projectName}
            project={selectedProject}
            onHideInput={hideInputHandler}
          />
        ) : (
          <Header
            displayTitle={selectedProject ? selectedProject.projectName : ''}
            onClick={showInputHandler}
          />
        )}
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
        {selectedProject ? <TodoList project={selectedProject} /> : null}
        {selectedProject ? (
          <CompletedTodoList project={selectedProject} />
        ) : null}
      </main>
    </div>
  );
}

export default ProjectContainer;
