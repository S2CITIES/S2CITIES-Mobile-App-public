import { createSlice } from "@reduxjs/toolkit";
import * as selectors from "./pushNotifications.selectors";
import {
   PushNotificationsState,
   SetNotificationAction,
   SetNotificationHasBeenManagedAction,
} from "./pushNotifications.interfaces";
import * as extraActions from "../../extra-actions";
import * as sagas from "./pushNotifications.sagas";

const initialState: PushNotificationsState = {
   notification: undefined,
   notificationHasToBeManaged: false,
};

export const pushNotificationsStore = createSlice({
   name: "pushNotifications",
   initialState,
   reducers: {
      setNotification: (state, action: SetNotificationAction) => {
         const newNotification = action?.payload?.notification;
         state.notification = newNotification;

         state.notificationHasToBeManaged = !!newNotification;
      },

      setNotificationHasBeenManaged: (
         state,
         action: SetNotificationHasBeenManagedAction
      ) => {
         state.notification = undefined;
         state.notificationHasToBeManaged = false;
      },
   },
});

export { selectors, sagas };
