import React from 'react';
import Styles from './Input.module.scss';

interface inputProps
  extends React.InputHTMLAttributes<
    React.RefAttributes<HTMLInputElement> | HTMLInputElement
  > {
  addProject?: boolean;
  addTodo?: boolean;
  addStep?: boolean;
  stepInput?: boolean;
  doneStepInput?: boolean;
  todoInDetails?: boolean;
  projectTitle?: boolean;
}

function Input(
  {
    addProject,
    addTodo,
    addStep,
    stepInput,
    doneStepInput,
    todoInDetails,
    projectTitle,
    ...props
  }: inputProps,
  ref: React.Ref<HTMLInputElement>,
) {
  let classes: string = '';
  if (addStep) {
    classes = [Styles.addInput, Styles.addStepInput].join(' ');
  } else if (addProject) {
    classes = Styles.addProject;
  } else if (stepInput) {
    classes = Styles.stepInputText;
  } else if (doneStepInput) {
    classes = [Styles.stepInputText, Styles.inputDoneText].join(' ');
  } else if (todoInDetails) {
    classes = Styles.todoDetailInput;
  } else if (projectTitle) {
    classes = Styles.projectTitle;
  } else {
    classes = [Styles.addInput, Styles.addTodoInput].join(' ');
  }

  return <input type='text' {...props} className={classes} ref={ref} />;
}

export default React.forwardRef(Input);
