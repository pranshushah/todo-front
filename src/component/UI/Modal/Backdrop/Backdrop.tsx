import React from 'react';
import Styles from './Backdrop.module.scss';
import { AnimatePresence, motion } from 'framer-motion';

type backdropProps = {
  onClick: () => void;
  show: boolean;
  children: React.ReactNode;
};

function BackDrop({ onClick, show, children }: backdropProps) {
  const backdropVariants = {
    visible: {
      opacity: 1,
      transition: {
        when: 'beforeChildren',
        duration: 0.2,
        delayChildren: 0.2,
      },
    },
    hidden: {
      opacity: 0,
      transition: {
        when: 'afterChildren',
        duration: 0.2,
        delay: 0.2,
      },
    },
  };
  return show ? (
    <AnimatePresence>
      <motion.div
        initial='hidden'
        animate='visible'
        exit='hidden'
        variants={backdropVariants}
        onClick={onClick}
        className={Styles.backdrop}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  ) : null;
}

export default BackDrop;
