import React, { useState, useRef } from 'react';
import Input from '../UI/Input/Input';
import Styles from './AddProject.module.scss';
import plus from '../../utils/svg/plusPurple.svg';
import focusedPlus from '../../utils/svg/plusGrey.svg';
import axios from '../../axios';
import { project } from '../../utils/types';
import produce from 'immer';
import { projects } from '../../atoms/allProjectAtom';
import { useSetRecoilState } from 'recoil';
import { useSetNotification } from '../../utils/customHooks/useAddNotification';
import { useHistory } from 'react-router-dom';
import { timeMessageObjCreate } from '../../utils/helperFunction/timeoutMessage';

function AddProject() {
  const [projectName, setProjectName] = useState('');
  const setProject = useSetRecoilState(projects);
  const [inputFocused, setInputFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { addNotification } = useSetNotification();
  const history = useHistory();

  function projectNameChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setProjectName(e.target.value);
  }

  async function projectAddHandler() {
    try {
      if (window.navigator.onLine) {
        const res = await axios.post<project>(
          '/api/project/new',
          {
            projectName,
          },
          timeMessageObjCreate('We were unable to add project'),
        );
        if (res.status === 200) {
          setProject((projectList) =>
            produce(projectList, (draft) => {
              draft.push(res.data);
            }),
          );
          history.push(`/project/${res.data.id}`);
        }
      } else {
        throw new Error('No internet connection');
      }
    } catch (e) {
      addNotification(e.message, 'NetWork Error');
    }
  }

  function enterHandler(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      setProjectName('');
      inputRef.current?.blur();
      if (projectName.trim()) {
        projectAddHandler();
      }
    }
  }
  function inputFocusedHandler() {
    setInputFocused(true);
  }
  function inputBlurHandler() {
    setInputFocused(false);
  }

  function imgClickHandler() {
    inputRef.current?.focus();
  }

  return (
    <div className={Styles.container}>
      <div className={Styles.plusContainer} onClick={imgClickHandler}>
        <img
          src={inputFocused ? focusedPlus : plus}
          alt=''
          className={Styles.plus}
        />
      </div>
      <Input
        ref={inputRef}
        onFocus={inputFocusedHandler}
        onBlur={inputBlurHandler}
        placeholder='New list'
        addProject
        value={projectName}
        onChange={projectNameChangeHandler}
        onKeyUp={enterHandler}
      />
    </div>
  );
}

export default AddProject;
