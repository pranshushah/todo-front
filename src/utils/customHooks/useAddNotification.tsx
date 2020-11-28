import { notificationAtom } from '../../atoms/NotificationAtom';
import produce from 'immer';
import { v4 } from 'uuid';
import { useSetRecoilState } from 'recoil';
/**
 * custom hook for adding or removing notification.
 * @returns object containing function that will remove or add notification
 */
export function useSetNotification() {
  const setNotificationList = useSetRecoilState(notificationAtom);

  function removeNotifcation(id: string) {
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
  function addNotification(message: string, type: string) {
    const id = v4();
    setNotificationList((notficationList) => {
      const newNotificationList = produce(notficationList, (draft) => {
        draft.push({ message, id, type });
      });
      return newNotificationList;
    });
    setTimeout(() => {
      removeNotifcation(id);
    }, 4000);
  }
  return { addNotification, removeNotifcation };
}
