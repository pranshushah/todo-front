import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { useRecoilState } from 'recoil';
import { notificationAtom } from '../../../atoms/NotificationAtom';
import CloseButton from '../../Todo/CloseButton/CloseButton';
import Styles from './NotificationModule.module.scss';
import produce from 'immer';

export default function NotificationList() {
  const [notificationList, setNotificationList] = useRecoilState(
    notificationAtom,
  );
  let el = document.querySelector('.notificationContainer');
  if (!el) {
    el = document.createElement('div');
    el.className = 'notificationContainer';
    document.body.appendChild(el);
  }

  function removeHandler(id: string) {
    setNotificationList((notificationList) => {
      const newNotificationList = produce(notificationList, (draft) => {
        draft.splice(
          draft.findIndex((notifitcation) => notifitcation.id === id),
          1,
        );
      });
      return newNotificationList;
    });
  }
  return createPortal(
    <ul className={Styles.ulContainer}>
      <AnimatePresence>
        {notificationList.map((notification, index) => {
          return (
            <motion.li
              className={Styles.notifcation}
              key={notification.id}
              initial={{ opacity: 0, y: 50, scale: 0.3 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{
                opacity: 0,
                scale: 0.5,
                x: 100,
              }}
              transition={{ duration: 0.2 }}
            >
              <div className={Styles.closeContainer}>
                <CloseButton
                  bigger
                  onClick={() => {
                    removeHandler(notification.id);
                  }}
                />
              </div>
              <p className={Styles.message}>{notification.message}</p>
              <p className={Styles.type}>{notification.type}</p>
            </motion.li>
          );
        })}
      </AnimatePresence>
    </ul>,
    el,
  );
}
