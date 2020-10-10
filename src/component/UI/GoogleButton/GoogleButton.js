import React from 'react';
import { motion } from 'framer-motion';
import Styles from './GoogleButton.module.scss';
/**
 * @param {import('react').ButtonHTMLAttributes} props
 */

export default function GoogleButton(props) {
  return (
    <motion.a
      {...props}
      href={`/api/auth/google`}
      whileTap={{ scale: 0.9 }}
      className={[Styles.google, Styles.btn].join(' ')}>
      <i className='fa fa-google fa-fw'></i> Login with Google
    </motion.a>
  );
}
