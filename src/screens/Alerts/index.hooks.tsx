import { useDispatch, useSelector } from "react-redux";
import { AlertsStyles, styles } from "./styles";
import { actions, selectors } from "redux-store";
import { useEffect, useState } from "react";
import { Alert } from "models";
import { Dispatch } from "redux";
import { alertFilterCallback } from "utils";
import { useAppTheme } from "utils/ui";
import { ColorSchemeName } from "react-native";

type AlertsHookProps = {
   styles: AlertsStyles;
   colorScheme: ColorSchemeName;
   allFilteredAlerts: Alert[];
   groupedFilteredAlerts: {
      key: string;
      data: Alert[];
   }[];
   areAlertsLoading: boolean;
   dispatch: Dispatch;
   filter: string;
   setFilter: (filter: string) => void;
   onlyUncheckedFilter: boolean;
   setOnlyUncheckedFilter: (bool: boolean) => void;
};

export const useAlerts = (): AlertsHookProps => {
   const areAlertsLoading = useSelector(selectors.getAlertsApiIsLoading());
   const dispatch = useDispatch();
   const colorScheme = useAppTheme();

   const [filter, setFilter] = useState("All");
   const [onlyUncheckedFilter, setOnlyUncheckedFilter] = useState(false);

   const allAlerts = useSelector(selectors.getAllAlerts());
   const groupedAlerts = useSelector(
      selectors.getAlertsOrderedAndGroupedByDate()
   );

   const allFilteredAlerts = allAlerts.filter(alert =>
      alertFilterCallback(alert, filter, onlyUncheckedFilter)
   );
   const groupedFilteredAlerts = groupedAlerts
      .map(alertGroup => {
         alertGroup.data = alertGroup.data.filter(alert =>
            alertFilterCallback(alert, filter, onlyUncheckedFilter)
         );
         return alertGroup;
      })
      .filter(alertGroup => alertGroup.data.length > 0);

   useEffect(() => {
      // retrieve all Zones from backend at mounting
      dispatch(actions.getZones.request({}));

      // retrieve all Users from backend at mounting
      dispatch(actions.getUsers.request({}));

      // retrieve all Alerts from backend at mounting
      dispatch(actions.getAlerts.request({}));

      const timer = setInterval(() => {
         dispatch(actions.getAlerts.request({}));
      }, 30000); // refresh every 30 seconds

      return () => {
         clearInterval(timer); // stop when unmounted
      };
   }, [dispatch]);

   return {
      styles,
      colorScheme,
      allFilteredAlerts,
      groupedFilteredAlerts,
      areAlertsLoading,
      dispatch,
      filter,
      setFilter,
      onlyUncheckedFilter,
      setOnlyUncheckedFilter,
   };
};
