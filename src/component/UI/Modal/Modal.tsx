import React from 'react';
import Button from '../Button/Button';
import BackDrop from './Backdrop/Backdrop';
import Styles from './Modal.module.scss';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';

type modalProps = {
  title: string;
  modalConfirmed: (() => void) | (() => Promise<void>);
  modalClosed: () => void;
  show: boolean;
  deleteButtonTitle: string;
};

function Modal({
  title,
  modalConfirmed,
  modalClosed,
  show,
  deleteButtonTitle,
}: modalProps) {
  let el: Element | null;
  el = document.querySelector('.modal');
  if (!el) {
    el = document.createElement('div');
    el.className = 'modal';
    document.body.appendChild(el);
  }
  return createPortal(
    <BackDrop onClick={modalClosed} show={show}>
      <motion.dialog
        open={show}
        initial={{ y: '100vh' }}
        animate={{ y: 0 }}
        exit={{ y: '100vh' }}
        transition={{ duration: 0.1 }}
        className={Styles.container}
      >
        <div className={Styles.contentContainer}>
          <p className={Styles.heading}>
            "{title}" will be permanently deleted.
          </p>
          <p className={Styles.text}>You won't be able to undo this action.</p>
        </div>
        <div className={Styles.action}>
          <Button
            style={{ marginRight: '12px' }}
            onClick={modalClosed}
            secondary
            dimension={'small'}
          >
            Cancel
          </Button>
          <Button onClick={modalConfirmed} danger dimension={'small'}>
            {deleteButtonTitle}
          </Button>
        </div>
      </motion.dialog>
    </BackDrop>,
    el,
  );
}

export default Modal;
