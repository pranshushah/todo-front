import React from 'react';
import AddTodo from '../AddTodo/AddTodo';
import Styles from './TaskContainer.module.scss';
function TaskContainer() {
  return (
    <div className={Styles.container}>
      <h1 className={Styles.headingHeader}>Tasks</h1>
      <AddTodo />
    </div>
  );
}

export default TaskContainer;
