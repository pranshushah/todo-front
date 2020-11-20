import React from 'react';
import Styles from './Input.module.scss';

interface inputProps
  extends React.InputHTMLAttributes<
    React.RefAttributes<HTMLInputElement> | HTMLInputElement
  > {
  addTodo?: boolean;
  addStep?: boolean;
  stepInput?: boolean;
  doneStepInput?: boolean;
  todoInDetails?: boolean;
}

function Input(
  {
    addTodo,
    addStep,
    stepInput,
    doneStepInput,
    todoInDetails,
    ...props
  }: inputProps,
  ref: React.Ref<HTMLInputElement>,
) {
  let classes: string = '';
  if (addStep) {
    classes = [Styles.addInput, Styles.addStepInput].join(' ');
  } else if (stepInput) {
    classes = Styles.stepInputText;
  } else if (doneStepInput) {
    classes = [Styles.stepInputText, Styles.inputDoneText].join(' ');
  } else if (todoInDetails) {
    classes = Styles.todoDetailInput;
  } else {
    classes = [Styles.addInput, Styles.addTodoInput].join(' ');
  }

  return <input type='text' {...props} className={classes} ref={ref} />;
}

export default React.forwardRef(Input);
