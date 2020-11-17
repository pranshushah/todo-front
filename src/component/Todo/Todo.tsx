import React from 'react';
import Styles from './TodoContainer.module.scss';
import MyDayBox from './myDayBox/myDayBox';
import TodoBox from './TodoBox/TodoBox';
import ButtonContainer from './ButtonContainer/ButtonContainer';
import CloseButton from './CloseButton/CloseButton';
import { useSetRecoilState } from 'recoil';
import { selectedTodo } from '../../atoms/selectedTodoAtom';

function Todo() {
  const setTodo = useSetRecoilState(selectedTodo);
  function closeHandler() {
    setTodo(null);
  }
  return (
    <div className={Styles.container}>
      <div className={Styles.close}>
        <CloseButton bigger onClick={closeHandler} />
      </div>
      <TodoBox />
      <MyDayBox />
      <ButtonContainer />
    </div>
  );
}

export default Todo;
