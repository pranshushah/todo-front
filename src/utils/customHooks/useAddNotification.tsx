import { notificationAtom } from '../../atoms/NotificationAtom';
import produce from 'immer';
import { v4 } from 'uuid';
import { useSetRecoilState } from 'recoil';
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
