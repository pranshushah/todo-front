import React, { useState } from 'react';
import Styles from './Accordion.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion';

type AccordionProps = {
  title: string;
  children: React.ReactNode[];
};

function Accordion({ title, children }: AccordionProps) {
  const [active, setActiveState] = useState(false);

  function toggleAccordion() {
    setActiveState((active) => !active);
  }
  const variant = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
    },
  };

  return (
    <AnimateSharedLayout>
      <motion.section className={Styles.accordionSection}>
        <motion.button
          layout
          className={
            active ? [Styles.accordion, active].join(' ') : Styles.accordion
          }
          onClick={toggleAccordion}
        >
          <motion.span layout className={Styles.icon}>
            <FontAwesomeIcon
              icon={faChevronRight}
              className={active ? Styles.rotate : 'none'}
            />
          </motion.span>
          <motion.h2 layout className={Styles.accordionTitle}>
            {title}
          </motion.h2>
        </motion.button>
        <AnimatePresence>
          {active && (
            <motion.div
              initial='initial'
              animate='animate'
              exit='exit'
              variants={variant}
              className={Styles.accordionContent}
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>
    </AnimateSharedLayout>
  );
}

export default Accordion;
