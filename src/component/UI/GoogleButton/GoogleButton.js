import React from 'react';
import { motion } from 'framer-motion';
import Styles from './GoogleButton.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/fontawesome-free-brands';

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
      <FontAwesomeIcon icon={faGoogle} style={{ marginRight: '8px' }} />
      Login with Google
    </motion.a>
  );
}
