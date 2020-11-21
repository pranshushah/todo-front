import React, { useState } from 'react';
import { createPortal } from 'react-dom';

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

  function portalHandler() {
    if (showTooltip && el && xcord && ycord) {
      return createPortal(
        <div
          style={{
            position: 'absolute',
            left: xcord,
            top: ycord - 50,
          }}
        >
          <div
            style={{
              position: 'relative',
              left: '-50%',
              background: 'white',
              fontSize: '12px',
              color: 'black',
              borderRadius: '2px',
              padding: '8px 12px',
              boxShadow: '0px 1px 7px 0px rgba(50, 50, 50, 0.75)',
            }}
          >
            {render}
            <span
              style={{
                position: 'absolute',
                bottom: -10,
                left: 'calc(50% - 5px)',
                borderWidth: 5,
                borderStyle: 'solid',
                borderColor: 'white transparent transparent transparent',
              }}
            />
          </div>
        </div>,
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
