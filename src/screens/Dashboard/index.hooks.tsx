import { Alert } from "models";
import { DashboardStyles, styles } from "./styles";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { actions, selectors } from "redux-store";
import { useEffect } from "react";
import { Rect, useSafeAreaFrame } from "react-native-safe-area-context";
import { useAppTheme } from "utils/ui";
import { ColorSchemeName } from "react-native";
import { AlertsLastMonthsStatistics } from "utils";

type DashboardHookProps = {
   styles: DashboardStyles;
   colorScheme: ColorSchemeName;
   safeAreaFrame: Rect;
   alertsLastMonthsStatistics: AlertsLastMonthsStatistics;
   dashboardAlerts: Alert[];
   groupedDashboardAlerts: {
      key: string;
      data: Alert[];
   }[];
   areAlertsLoading: boolean;
   dispatch: Dispatch;
};

export const useDashboard = (): DashboardHookProps => {
   const safeAreaFrame = useSafeAreaFrame();
   const colorScheme = useAppTheme();
   const dispatch = useDispatch();
   const areAlertsLoading = useSelector(selectors.getAlertsApiIsLoading());

   const dashboardAlerts = useSelector(selectors.getDashboardAlerts());
   const groupedDashboardAlerts = useSelector(
      selectors.getDashboardAlertsOrderedAndGroupedByDate()
   );

   const dashboardAlertsVideosUrls = useSelector(
      selectors.getAlertsVideosUrls(dashboardAlerts.map(alert => alert._id))
   );

   const alertsLastMonthsStatistics = useSelector(
      selectors.getAlertsLast9MonthsStatistics()
   );

   useEffect(() => {
      // retrieve all Zones from backend at mounting
      dispatch(actions.getZones.request({}));

      // retrieve all Users from backend at mounting
      dispatch(actions.getUsers.request({}));

      // retrieve all Alerts from backend at mounting
      dispatch(actions.getAlerts.request({}));

      const timer = setInterval(() => {
         dispatch(actions.getAlerts.request({}));

         // refresh dashboard videos
         if (dashboardAlerts?.length > 0) {
            dispatch(
               actions.getAlertsVideoS3signedurls.request({
                  alertIds: dashboardAlerts.map(alert => alert._id),
               })
            );
         }
      }, 30000); // refresh every 30 seconds

      return () => {
         clearInterval(timer); // stop when unmounted
      };
   }, [dispatch]);

   useEffect(() => {
      if (
         !dashboardAlerts || // dashboard alerts have not been loaded yet
         dashboardAlerts.length === 0 ||
         dashboardAlertsVideosUrls?.length === 6
      )
         return;

      console.log(
         `dashboard videos request dispatched: ${dashboardAlerts
            .map(alert => alert._id)
            .join(", ")}`
      );

      // retrieve dashboard alerts videos
      dispatch(
         actions.getAlertsVideoS3signedurls.request({
            alertIds: dashboardAlerts.map(alert => alert._id),
         })
      );
   }, [dashboardAlerts, dashboardAlertsVideosUrls?.length]);

   return {
      styles,
      colorScheme,
      safeAreaFrame,
      alertsLastMonthsStatistics,
      dashboardAlerts,
      groupedDashboardAlerts,
      areAlertsLoading,
      dispatch,
   };
};
