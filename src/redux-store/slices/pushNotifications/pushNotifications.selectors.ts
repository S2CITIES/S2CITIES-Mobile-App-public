import { RootState } from "redux-store";

export const getPushNotifications = (state: RootState) =>
   state?.pushNotifications;

export const hasNotificationToBeManaged = () => (state: RootState) => {
   return state?.pushNotifications?.notificationHasToBeManaged ?? false;
};

export const getNotification = () => (state: RootState) => {
   return state?.pushNotifications?.notification;
};
