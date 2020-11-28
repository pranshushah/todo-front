import React, { useState, useRef } from 'react';
import CheckBox from '../../UI/CheckBox/CheckBox';
import { stepType, todoBody, editStepDoneStatus } from '../../../utils/types';
import axios from '../../../axios';
import { useRecoilValue } from 'recoil';
import { selectedTodo } from '../../../atoms/selectedTodoAtom';
import Styles from './StepItem.module.scss';
import CloseButton from '../CloseButton/CloseButton';
import { useSetTaskFromTaskDetails } from '../../../utils/customHooks/useUpdateTaskFromTaskDetails';
import Tooltip from '../../UI/Tooltip/Tooltip';
import { useSetNotification } from '../../../utils/customHooks/useAddNotification';
import Input from '../../UI/Input/Input';
import Modal from '../../UI/Modal/Modal';

type stepProps = {
  step: stepType;
};

type editStepTitle = {
  todoId: string;
  projectId?: string;
  newStepTitle: string;
  stepId: string;
};

function StepItem({ step }: stepProps) {
  const { addNotification } = useSetNotification();
  const todo = useRecoilValue(selectedTodo);
  const updateTaskFromDetails = useSetTaskFromTaskDetails();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [stepInput, setStepInput] = useState(step.taskTitle);
  const [modalToggle, setModalToggle] = useState(false);

  async function stepDoneStatusChangeHandler(newStauts: editStepDoneStatus) {
    if (todo) {
      try {
        if (window.navigator.onLine) {
          const res = await axios.patch<todoBody>(
            '/api/edit/step/done',
            newStauts,
            {
              timeoutErrorMessage: 'Unable to update step tod',
            },
          );
          if (res.status === 200) {
            updateTaskFromDetails(todo, res.data);
          }
        } else {
          throw new Error('No internet connection');
        }
      } catch (e) {
        addNotification(e.message, 'Network Error');
      }
    }
  }

  function modalCloseHandler() {
    setModalToggle(false);
  }

  function modalOpenHandler() {
    setModalToggle(true);
  }

  function checkBoxChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    if (todo) {
      stepDoneStatusChangeHandler({
        todoId: todo.id,
        stepId: step.id,
        done: e.target.checked,
      });
    }
  }

  async function stepDeleteHandler() {
    if (todo) {
      try {
        if (window.navigator.onLine) {
          const res = await axios.patch<todoBody>(
            '/api/edit/step/delete',
            {
              todoId: todo.id,
              stepId: step.id,
            },
            {
              timeoutErrorMessage: 'Unable to update step todo',
            },
          );
          if (res.status === 200) {
            updateTaskFromDetails(todo, res.data);
          }
        } else {
          throw new Error('No internet connection');
        }
      } catch (e) {
        addNotification(e.message, 'Network Error');
      }
    }
    setModalToggle(false);
  }

  function stepInputChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setStepInput(e.target.value);
  }

  async function todoTitleChangeHandler(newStatus: editStepTitle) {
    if (todo) {
      try {
        if (window.navigator.onLine) {
          const res = await axios.patch<todoBody>(
            '/api/edit/step/title',
            newStatus,
            {
              timeoutErrorMessage: 'Unable to update step todo',
            },
          );
          if (res.status === 200) {
            updateTaskFromDetails(todo, res.data);
          }
        } else {
          throw new Error('No internet connection');
        }
      } catch (e) {
        addNotification(e.message, 'Network Error');
      }
    }
  }

  function updateNewStepTitle() {
    if (todo && stepInput) {
      if (stepInput?.trim() !== step.taskTitle) {
        todoTitleChangeHandler({
          todoId: todo.id,
          stepId: step.id,
          newStepTitle: stepInput.trim(),
        });
      }
    }
    if (!stepInput?.trim()) {
      setStepInput(step.taskTitle);
    }
  }

  function doneOnEnter(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      updateNewStepTitle();
      inputRef.current?.blur();
    }
  }

  return (
    <>
      <Modal
        modalClosed={modalCloseHandler}
        modalConfirmed={stepDeleteHandler}
        title={step.taskTitle}
        show={modalToggle}
        deleteButtonTitle='Delete Step'
      />
      <div className={Styles.container}>
        <div className={Styles.checkboxContainer}>
          <Tooltip
            render={step.done ? 'Mark as not completed' : 'Mark as completed'}
          >
            <CheckBox
              checked={step.done}
              onChange={checkBoxChangeHandler}
              small={true}
            />
          </Tooltip>
        </div>
        <Input
          type='text'
          ref={inputRef}
          onBlur={updateNewStepTitle}
          onKeyUp={doneOnEnter}
          value={stepInput}
          doneStepInput={step.done}
          stepInput={!step.done}
          onChange={stepInputChangeHandler}
        />
        <div className={Styles.buttonContainer}>
          <CloseButton onClick={modalOpenHandler} />
        </div>
      </div>
    </>
  );
}

export default StepItem;
