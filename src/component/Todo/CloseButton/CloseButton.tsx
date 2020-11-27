import React from 'react';
import Styles from './CloseButton.module.scss';
import { motion } from 'framer-motion';

type closeButtonProps = {
  onClick: (() => Promise<void>) | (() => void);
  bigger?: boolean;
};

function CloseButton({ onClick, bigger = false }: closeButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      className={bigger ? Styles.bigButton : Styles.closeButton}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      &times;
    </motion.button>
  );
}

export default CloseButton;
