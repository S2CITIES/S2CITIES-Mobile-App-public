import * as Notifications from "expo-notifications";
import { Action } from "redux";

export interface PushNotificationsState {
   notification: Notifications.Notification;
   notificationHasToBeManaged: boolean;
}

export interface SetNotificationAction extends Action {
   payload: {
      notification: Notifications.Notification;
   };
}

export interface SetNotificationHasBeenManagedAction extends Action {
   payload: {};
}
