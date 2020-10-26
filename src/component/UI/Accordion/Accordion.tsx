import React, { useState, useRef } from 'react';
import Styles from './Accordion.module.scss';

type AccordionProps = {
  title: string;
  content: React.ReactNode[];
};

function Accordion(props: AccordionProps) {
  const [active, setActiveState] = useState('');
  const [height, setHeightState] = useState('0px');

  const content = useRef<HTMLDivElement>(null);

  function toggleAccordion() {
    setActiveState(active === '' ? 'active' : '');
    setHeightState(
      active === 'active' ? '0px' : `${content.current?.scrollHeight}px`,
    );
  }

  return (
    <div className={Styles.accordionSection}>
      <button
        className={
          active ? [Styles.accordion, active].join(' ') : Styles.accordion
        }
        onClick={toggleAccordion}>
        <span className={Styles.icon}>
          <i
            className={
              active
                ? ['fa', 'fa-chevron-right', Styles.rotate].join(' ')
                : 'fa fa-chevron-right'
            }
            aria-hidden='true'
          />
        </span>
        <p className={Styles.accordionTitle}>{props.title}</p>
      </button>
      <div
        ref={content}
        style={{ maxHeight: `${height}` }}
        className={Styles.accordionContent}>
        {props.content}
      </div>
    </div>
  );
}

export default Accordion;
