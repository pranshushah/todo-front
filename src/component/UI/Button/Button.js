import React from 'react';
import Styles from './Button.module.scss';
import { motion } from 'framer-motion';
/**
 * @typedef{ import('react').HTMLProps<HTMLButtonElement>} buttonProps 
 * @typedef{import('react').Ref<HTMLButtonElement>}  buttonRefType
/**

/**
 * @param {{
 * primary:boolean,
 * dimension:("small"|"medium"|"large"|"huge"),
 * } & buttonProps} props
 * @param {buttonRefType} ref
 */

function Button(
  {
    children,
    primary,
    secondary,
    darkPrimary,
    danger,
    dimension = 'medium',
    inverted,
    ...props
  },
  ref,
) {
  const classes = [Styles.button, Styles.primary];

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
      className={classes.join(' ')}>
      {children}
    </motion.button>
  );
}

export default Button;
