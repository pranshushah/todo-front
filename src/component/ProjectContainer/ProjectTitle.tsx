import React, { useRef } from 'react';
import { project } from '../../utils/types';
import axios from '../../axios';
import Styles from './ProjectContainer.module.scss';
import { projects } from '../../atoms/allProjectAtom';
import produce from 'immer';
import { useSetNotification } from '../../utils/customHooks/useAddNotification';
import { useSetRecoilState } from 'recoil';

type projectTitleProps = {
  inputValue: string | undefined;
  onChangeInput: (val: string) => void;
  initialInputValue: string | undefined;
  project: project | undefined;
  onHideInput: () => void;
};

function ProjectTitle({
  inputValue,
  onChangeInput,
  initialInputValue,
  project,
  onHideInput,
}: projectTitleProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const setProjects = useSetRecoilState(projects);
  const { addNotification } = useSetNotification();

  function inputChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    onChangeInput(e.target.value);
  }

  function enterHandler(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && !e.altKey && !e.shiftKey && !e.ctrlKey) {
      inputRef.current?.blur();
    }
  }

  // storing Value
  async function inputBlurHandler() {
    if (inputValue?.trim()) {
      try {
        if (window.navigator.onLine) {
          const res = await axios.patch<project>(
            '/api/project',
            {
              updatedProjectName: inputValue.trim(),
              projectId: project?.id,
            },
            { timeoutErrorMessage: 'unable to update list title' },
          );
          if (res.status === 200) {
            setProjects((projects) =>
              produce(projects, (draft) => {
                const editIndex = draft.findIndex(
                  (givenProject) => givenProject.id === res.data.id,
                );
                if (editIndex > -1) {
                  draft[editIndex].projectName = res.data.projectName;
                }
              }),
            );
            onChangeInput(res.data.projectName);
          }
        } else {
          throw new Error('there is no internet connection');
        }
      } catch (e) {
        addNotification(e.message, 'Newtowork Error');
        if (initialInputValue) {
          onChangeInput(initialInputValue);
        }
      }
    } else {
      if (initialInputValue) {
        onChangeInput(initialInputValue);
      }
    }
    onHideInput();
  }

  return (
    <input
      type='text'
      ref={inputRef}
      value={inputValue}
      onBlur={inputBlurHandler}
      onChange={inputChangeHandler}
      onKeyUp={enterHandler}
      className={Styles.projectTitle}
      size={inputValue ? inputValue.length - 1 : 0}
      maxLength={255}
      autoFocus
    />
  );
}

export default ProjectTitle;
