import React from 'react';
import Styles from './TwitterButton.module.scss';
import { motion } from 'framer-motion';

/**
 * @param {import('react').ButtonHTMLAttributes} props
 */
export default function TwitterButton(props) {
  return (
    <motion.a
      {...props}
      href={`/api/auth/twitter`}
      whileTap={{ scale: 0.9 }}
      className={[Styles.twitter, Styles.btn].join(' ')}>
      <i className='fa fa-twitter fa-fw'></i> Login with Twitter
    </motion.a>
  );
}
