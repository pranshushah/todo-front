import React from 'react';
import Styles from './TodoContainer.module.scss';
import MyDayBox from './myDayBox/myDayBox';
import TodoBox from './TodoBox/TodoBox';
import ButtonContainer from './ButtonContainer/ButtonContainer';
import CloseButton from './CloseButton/CloseButton';
import { useSetRecoilState } from 'recoil';
import { selectedTodo } from '../../atoms/selectedTodoAtom';
import DueDate from './DueDate/DueDate';
import { motion, AnimatePresence } from 'framer-motion';

function Todo() {
  const setTodo = useSetRecoilState(selectedTodo);
  function closeHandler() {
    setTodo(null);
  }
  const transition = {
    duration: 0.2,
  };
  const variant = {
    initial: {
      opacity: 0,
      x: 1000,
    },
    animate: {
      opacity: 1,
      x: 0,
      transition,
    },
    exit: {
      opacity: 0,
      x: 1000,
    },
  };
  return (
    <AnimatePresence>
      <motion.section
        variants={variant}
        initial='initial'
        animate='animate'
        exit='exit'
        className={Styles.container}
      >
        <div className={Styles.close}>
          <CloseButton onClick={closeHandler} bigger />
        </div>
        <TodoBox />
        <MyDayBox />
        <DueDate />
        <ButtonContainer />
      </motion.section>
    </AnimatePresence>
  );
}

export default Todo;
