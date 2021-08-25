import React from 'react';
import Styles from './TwitterButton.module.scss';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/fontawesome-free-brands';

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
      <FontAwesomeIcon icon={faTwitter} style={{ marginRight: '8px' }} />
      Login with Twitter
    </motion.a>
  );
}
