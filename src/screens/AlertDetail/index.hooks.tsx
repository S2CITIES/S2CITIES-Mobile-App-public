import React, { useEffect, useState } from "react";
import { styles } from "./styles";
import { NavigationProp } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { AlertHeader } from "components";
import { useDispatch, useSelector } from "react-redux";
import { actions, selectors } from "redux-store";
import { AlertActionType, AlertBasicInfo } from "models";
import { useSafeAreaFrame } from "react-native-safe-area-context";
import { useAppTheme } from "utils/ui";

type useAlertDetailProps = {
   navigation: NavigationProp<any>;
   alertBasicInfo: AlertBasicInfo;
};

export const useAlertDetail = ({
   navigation,
   alertBasicInfo,
}: useAlertDetailProps) => {
   const colorScheme = useAppTheme();
   const safeAreaFrame = useSafeAreaFrame();
   const dispatch = useDispatch();

   const { id } = alertBasicInfo;
   const alert = useSelector(selectors.getAlert(id));
   const alertVideoUrl = useSelector(selectors.getAlertVideoUrl(id));

   const alertZone = useSelector(selectors.getZone(alert?.zone_id));
   const allUsers = useSelector(selectors.getAllUsers);

   // if the alert is assigned to a zone, it can be assigned only to users belonging to that zone;
   // if the alert is not assigned to any zone, it can be assigned to anyone
   const assignableUsers = (
      alertZone && alertZone.users ? alertZone.users : allUsers
   ).map(user => {
      user.selected = (alert?.assigned_users ?? []).includes(user.id);
      return user;
   });

   const [lastTappedAction, setLastTappedAction] = useState<AlertActionType>();

   useLayoutEffect(() => {
      // set and show alert detail header
      navigation.setOptions({
         header: () => (
            <AlertHeader
               navigation={navigation}
               alertBasicInfo={alertBasicInfo}
            />
         ),
         headerShown: true,
      });

      // hide alert tab header
      const parentNavigator = navigation.getParent();
      parentNavigator.setOptions({
         headerShown: false,
      });

      return () => {
         // hide alert detail alert when going somewhere else
         navigation.setOptions({
            headerShown: false,
         });

         // and show again alert tab header
         parentNavigator.setOptions({
            headerShown: true,
         });
      };
   }, [navigation, alertBasicInfo]);

   useEffect(() => {
      dispatch(
         actions.getAlertsVideoS3signedurlByAlertId.request({
            alertId: alertBasicInfo.id,
         })
      );

      dispatch(actions.getAlerts.request({}));

      const timer = setInterval(() => {
         dispatch(actions.getAlerts.request({}));
      }, 30000); // refresh every 30 seconds

      return () => {
         clearInterval(timer); // stop when unmounted
      };
   }, [alertBasicInfo, dispatch]);

   return {
      styles,
      alert,
      alertVideoUrl,
      colorScheme,
      safeAreaFrame,
      lastTappedAction,
      setLastTappedAction,
      assignableUsers,
   };
};
