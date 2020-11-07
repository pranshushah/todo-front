import React from 'react';
import Styles from './TodoContainer.module.scss';
import MyDayBox from './myDayBox/myDayBox';
import TodoBox from './TodoBox/TodoBox';

function Todo() {
  return (
    <div className={Styles.container}>
      <TodoBox />
      <MyDayBox />
    </div>
  );
}

export default Todo;
