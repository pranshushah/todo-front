import React from 'react';
import Styles from './CloseButton.module.scss';

type closeButtonProps = {
  onClick: () => Promise<void>;
};

function CloseButton({ onClick }: closeButtonProps) {
  return (
    <button className={Styles.closeButton} onClick={onClick}>
      &times;
    </button>
  );
}

export default CloseButton;
