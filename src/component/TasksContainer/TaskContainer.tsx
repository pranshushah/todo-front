import React from 'react';
import AddTodo from './AddTodo/AddTodo';
import TodoList from './TaskList/TaskList';
import Styles from './TaskContainer.module.scss';

function TaskContainer() {
  return (
    <div className={Styles.container}>
      <h1 className={Styles.headingHeader}>Tasks</h1>
      <AddTodo />
      <TodoList />
    </div>
  );
}

export default TaskContainer;
