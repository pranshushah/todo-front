import React from 'react';
import Styles from './Button.module.scss';
import { motion, HTMLMotionProps } from 'framer-motion';

interface buttonProps extends HTMLMotionProps<'button'> {
  primary?: boolean;
  secondary?: boolean;
  danger?: boolean;
  dimension?: 'small' | 'medium' | 'large' | 'huge';
}

function Button({
  dimension,
  primary,
  secondary,
  danger,
  children,
  ...props
}: buttonProps) {
  let classes: string[];
  if (secondary) {
    classes = [Styles.button, Styles.secondary];
  } else if (danger) {
    classes = [Styles.button, Styles.danger];
  } else {
    classes = [Styles.button, Styles.primary];
  }

  switch (dimension) {
    case 'huge': {
      classes.push(Styles.huge);
      break;
    }
    case 'large': {
      classes.push(Styles.large);
      break;
    }
    case 'small': {
      classes.push(Styles.small);
      break;
    }
    default: {
      classes.push(Styles.medium);
    }
  }

  return (
    <motion.button
      {...props}
      whileTap={{ scale: 0.9 }}
      className={classes.join(' ')}
    >
      {children}
    </motion.button>
  );
}

export default Button;
