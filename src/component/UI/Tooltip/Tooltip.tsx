import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Styles from './Tooltip.module.scss';

type TooltipProps = {
  children: React.ReactNode;
  render: string;
};

function Tooltip({ children, render }: TooltipProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [xcord, setXcord] = useState<null | number>(null);
  const [ycord, setYcord] = useState<null | number>(null);
  let el: Element | null;
  el = document.querySelector('.tooltip-rc');
  if (!el) {
    el = document.createElement('div');
    el.className = 'tooltip-rc';
    document.body.appendChild(el);
  }

  function showTooltipHandler(
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
  ) {
    setShowTooltip(true);
    setXcord(e.pageX);
    setYcord(e.pageY);
  }
  function hideTooltipHandler() {
    setShowTooltip(false);
    setXcord(null);
    setYcord(null);
  }

  const varaints = {
    initial: {
      opacity: 0,
      scale: 0.1,
    },
    animate: {
      opacity: 1,
      scale: 1,
    },
  };

  function portalHandler() {
    if (showTooltip && el && xcord && ycord) {
      return createPortal(
        <AnimatePresence>
          <motion.div
            initial='initial'
            animate='animate'
            variants={varaints}
            style={{
              position: 'absolute',
              left: xcord,
              top: ycord - 50,
            }}
          >
            <div className={Styles.tooltipContainer}>
              {render}
              <span className={Styles.arrow} />
            </div>
          </motion.div>
        </AnimatePresence>,
        el,
      );
    } else {
      return <div></div>;
    }
  }

  const data = (
    <span
      key={0}
      onMouseMove={showTooltipHandler}
      onMouseLeave={hideTooltipHandler}
    >
      {children}
    </span>
  );

  return (
    <>
      {data}
      {portalHandler()}
    </>
  );
}

export default Tooltip;
