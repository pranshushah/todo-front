import React, { useState, useRef } from 'react';
import CheckBox from '../../UI/CheckBox/CheckBox';
import { stepType, todoBody, editStepDoneStatus } from '../../../utils/types';
import { useSetAllTask } from '../../../utils/TaskListUpdater/useSetAllTask';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { selectedTodo } from '../../../atoms/selectedTodoAtom';
import Styles from './StepItem.module.scss';
import CloseButton from '../CloseButton/CloseButton';

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
  const [todo, setTodo] = useRecoilState(selectedTodo);
  const updateAllTasks = useSetAllTask();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [stepInput, setStepInput] = useState(step.taskTitle);

  async function stepDoneStatusChangeHandler(newStauts: editStepDoneStatus) {
    if (todo) {
      const res = await axios.patch<todoBody>('/api/edit/step/done', newStauts);
      if (res.status === 200) {
        if (res.data.dueDate) {
          const newTodo = {
            ...res.data,
            createdAt: new Date(res.data.createdAt),
            dueDate: new Date(res.data.dueDate),
          };
          updateAllTasks(todo, newTodo);
          setTodo(newTodo);
        } else {
          const newTodo = {
            ...res.data,
            createdAt: new Date(res.data.createdAt),
            dueDate: undefined,
          };
          updateAllTasks(todo, newTodo);
          setTodo(newTodo);
        }
      }
    }
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
      const res = await axios.patch<todoBody>('/api/edit/step/delete', {
        todoId: todo.id,
        stepId: step.id,
      });
      if (res.status === 200) {
        if (res.data.dueDate) {
          const newTodo = {
            ...res.data,
            createdAt: new Date(res.data.createdAt),
            dueDate: new Date(res.data.dueDate),
          };
          updateAllTasks(todo, newTodo);
          setTodo(newTodo);
        } else {
          const newTodo = {
            ...res.data,
            createdAt: new Date(res.data.createdAt),
            dueDate: undefined,
          };
          updateAllTasks(todo, newTodo);
          setTodo(newTodo);
        }
      }
    }
  }

  function stepInputChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setStepInput(e.target.value);
  }

  async function todoTitleChangeHandler(newStatus: editStepTitle) {
    if (todo) {
      const res = await axios.patch<todoBody>(
        '/api/edit/step/title',
        newStatus,
      );
      if (res.status === 200) {
        if (res.data.dueDate) {
          const newTodo = {
            ...res.data,
            createdAt: new Date(res.data.createdAt),
            dueDate: new Date(res.data.dueDate),
          };
          updateAllTasks(todo, newTodo);
          setTodo(newTodo);
        } else {
          const newTodo = {
            ...res.data,
            createdAt: new Date(res.data.createdAt),
            dueDate: undefined,
          };
          updateAllTasks(todo, newTodo);
          setTodo(newTodo);
        }
      }
    }
  }

  function updateNewStepTitle() {
    console.log('zoom');
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
    <div className={Styles.container}>
      <CheckBox
        checked={step.done}
        onChange={checkBoxChangeHandler}
        small={true}
      />
      <input
        type='text'
        ref={inputRef}
        onBlur={updateNewStepTitle}
        onKeyUp={doneOnEnter}
        value={stepInput}
        onChange={stepInputChangeHandler}
        className={step.done ? Styles.inputDoneText : Styles.inputText}
      />
      <div className={Styles.buttonContainer}>
        <CloseButton onClick={stepDeleteHandler} />
      </div>
    </div>
  );
}

export default StepItem;
