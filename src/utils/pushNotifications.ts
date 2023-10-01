import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { Platform } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { actions, selectors } from "redux-store";
import { useEffect } from "react";
import { NavigationProp } from "@react-navigation/native";
import {
   Alert,
   AlertBasicInfo,
   NotificationType,
   S2citiesPushNotification,
} from "models";

async function sendPushNotification(
   expoPushToken: string,
   title?: string,
   body?: string,
   data?: string
) {
   const expoPushNotificationEndpoint = "https://exp.host/--/api/v2/push/send";

   const message = {
      to: expoPushToken,
      sound: "default",
      title: title ?? "S2CITIES",
      body: body ?? "You received a new notification from the S2CITIES app",
      data: { someData: data ?? "" },
   };

   await fetch(expoPushNotificationEndpoint, {
      method: "POST",
      headers: {
         Accept: "application/json",
         "Accept-encoding": "gzip, deflate",
         "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
   });
}

/**
 * Register this device to Expo servers to receive push notifications and returns the device's token
 * (if the request was successful)
 * @param sendErrorAlert
 * @returns a string representing the device token used to send/receive push notifications
 */
export async function registerForPushNotificationsAsync(
   sendErrorAlert: (message: string) => void
): Promise<string> {
   let token: Notifications.ExpoPushToken;

   // check this is a real device
   if (!Device.isDevice) {
      // this is not a real device but a simulator: simulators cannot receive push notifications
      sendErrorAlert("Must use physical device for Push Notifications");
      return;
   }

   let existingStatus: Notifications.PermissionStatus;

   try {
      // retrieve current notifications permissions status
      const { status } = await Notifications.getPermissionsAsync();
      existingStatus = status;
   } catch (error) {
      const message = `Error in getting notification permissions`;
      console.log(`${message}. Error: ${error}`);
      sendErrorAlert(message);
      return;
   }

   let finalStatus = existingStatus;
   if (existingStatus !== "granted") {
      try {
         const { status } = await Notifications.requestPermissionsAsync();
         finalStatus = status;
      } catch (error) {
         const message = `Error in requesting notification permissions`;
         console.log(`${message}. Error: ${error}`);
         sendErrorAlert(message);
         return;
      }
   }
   if (finalStatus !== "granted") {
      sendErrorAlert(
         "No push notification permissions granted: you won't be able to receive any alert notification"
      );
      return;
   }

   try {
      // this will register this device for receiving push notifications from Expo servers;
      // 'token' will be the token used to send notifications to this device
      token = await Notifications.getExpoPushTokenAsync({
         projectId: Constants.expoConfig.extra.eas.projectId,
      });
      console.log(token);
   } catch (error) {
      const message = `Error registering for push notifications`;
      sendErrorAlert(`${message}. Error: ${error}`);
      console.log(message);
      return;
   }

   if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
         name: "default",
         importance: Notifications.AndroidImportance.MAX,
         vibrationPattern: [0, 250, 250, 250],
         lightColor: "#FF231F7C",
      });
   }

   return token?.data;
}

export function useNotificationListenerToNavigateToRoot(
   navigation: NavigationProp<any>
) {
   const notification = useSelector(selectors.getNotification());
   const hasNotificationToBeManaged = useSelector(
      selectors.hasNotificationToBeManaged()
   );

   useEffect(() => {
      if (!notification || !hasNotificationToBeManaged) return;

      // manage notification
      const notificationContent = notification.request.content.data;
      const notificationType = notificationContent.type;

      if (
         notificationType === NotificationType.HandSignalAlert ||
         notificationType === NotificationType.GenericAlert ||
         notificationType === NotificationType.EmergencyAlert
      ) {
         // navigate to Dashboard
         navigation.reset({
            index: 0,
            routes: [{ name: "Root" }],
         });
      }
   }, [notification]);
}

export function useNotificationListenerToNavigateFromRootToProperView(
   navigation: NavigationProp<any>
) {
   const dispatch = useDispatch();

   const notification = useSelector(selectors.getNotification());
   const hasNotificationToBeManaged = useSelector(
      selectors.hasNotificationToBeManaged()
   );
   const setNotificationHasBeenManaged = () => {
      dispatch(actions.setNotificationHasBeenManaged({}));
   };

   useEffect(() => {
      if (!notification || !hasNotificationToBeManaged) return;

      // manage notification
      const notificationContent = notification.request.content
         .data as S2citiesPushNotification;
      const notificationType = notificationContent.type;
      const notificationData = notificationContent.data;

      if (
         notificationType === NotificationType.HandSignalAlert ||
         notificationType === NotificationType.GenericAlert ||
         notificationType === NotificationType.EmergencyAlert
      ) {
         // retrieve alert info from notification
         const data: AlertBasicInfo = {
            id: notificationData["id"],
            shortAddress: notificationData["shortAddress"],
            type: notificationData["type"],
            cam: notificationData["cam"],
            timestamp: notificationData["timestamp"],
         };

         // convert notification timestamp into local time
         if (data.timestamp) {
            data.localTime = Alert.fromTimestampToLocalTime(data.timestamp);
         }

         // navigate to AlertDetail
         navigation.navigate("DashboardAlertDetail", data);
      }

      setNotificationHasBeenManaged();
   }, [notification]);
}
