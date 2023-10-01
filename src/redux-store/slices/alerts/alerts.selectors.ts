import { hardcodedUserId } from "config";
import dayjs from "dayjs";
import { Alert } from "models";
import { RootState } from "redux-store";
import {
   AlertsLastMonthsStatistics,
   addInfoTo,
   computeAlertsLastMonthsStatistics,
   groupBy,
} from "utils";

export const getAlerts = (state: RootState) => state?.alerts;

export const getAllAlerts = () => (state: RootState) =>
   state?.alerts?.allAlerts ?? [];

export const getDashboardAlerts = () => (state: RootState) => {
   // retrieve all alerts, already sorted in decreasing chronological order
   const allSortedAlerts = state?.alerts?.allAlerts ?? [];

   // take the latest 6 unchecked alerts
   return allSortedAlerts.filter(alert => !alert.check.marked).slice(0, 6);
};

export const getAlertsOrderedAndGroupedByDate = () => (state: RootState) => {
   // retrieve all alerts, already sorted in decreasing chronological order
   const allSortedAlerts = state?.alerts?.allAlerts ?? [];

   // group them by date and sort the groups by date
   const groupedAlerts = groupBy(allSortedAlerts, alert =>
      dayjs(alert.timestamp).format("YYYY-MM-DD")
   );

   return groupedAlerts.sort((group1, group2) => {
      const date1 = group1.key;
      const date2 = group2.key;

      if (date1 === date2) return 0;
      if (date1 < date2) return 1;
      if (date1 > date2) return -1;
   });
};

export const getDashboardAlertsOrderedAndGroupedByDate =
   () => (state: RootState) => {
      // retrieve all alerts, already sorted in decreasing chronological order
      let allSortedAlerts = state?.alerts?.allAlerts ?? [];

      // take the latest 6 unchecked alerts
      allSortedAlerts = allSortedAlerts
         .filter(alert => !alert.check.marked)
         .slice(0, 6);

      // group them by date and sort the groups by date
      const groupedAlerts = groupBy(allSortedAlerts, alert =>
         dayjs(alert.timestamp).format("YYYY-MM-DD")
      );

      return groupedAlerts.sort((group1, group2) => {
         const date1 = group1.key;
         const date2 = group2.key;

         if (date1 === date2) return 0;
         if (date1 < date2) return 1;
         if (date1 > date2) return -1;
      });
   };

export const getAlert =
   (id: string) =>
   (state: RootState): Alert => {
      const alert = (state?.alerts?.allAlerts ?? []).find(
         alert => alert._id === id
      );

      if (!alert) return alert;

      // improve alert information field
      const alertWithFormattedInfo = addInfoTo(alert);
      return alertWithFormattedInfo;
   };

/* Tasks */

export const getAllTasks = () => (state: RootState) => {
   // TODO: * replace this hardcoded userId with the current userId, once authentication is managed *
   const userId = hardcodedUserId;

   return (state?.alerts?.allAlerts ?? []).filter(alert =>
      alert.assigned_users.includes(userId)
   );
};

export const getTasksOrderedAndGroupedByDate = () => (state: RootState) => {
   // TODO: * replace this hardcoded userId with the current userId, once authentication is managed *
   const userId = hardcodedUserId;

   // retrieve all user tasks (alerts), already sorted in decreasing chronological order
   const allSortedTasks = (state?.alerts?.allAlerts ?? []).filter(alert =>
      alert.assigned_users.includes(userId)
   );

   // group them by date and sort the groups by date
   const groupedAlerts = groupBy(allSortedTasks, alert =>
      dayjs(alert.timestamp).format("YYYY-MM-DD")
   );

   return groupedAlerts.sort((group1, group2) => {
      const date1 = group1.key;
      const date2 = group2.key;

      if (date1 === date2) return 0;
      if (date1 < date2) return 1;
      if (date1 > date2) return -1;
   });
};

/* Alerts statistics */

export const getAlertsLast9MonthsStatistics =
   () =>
   (state: RootState): AlertsLastMonthsStatistics => {
      const allAlerts = state?.alerts?.allAlerts ?? [];
      const maxLastMonths = 9;

      return computeAlertsLastMonthsStatistics(allAlerts, maxLastMonths);
   };
