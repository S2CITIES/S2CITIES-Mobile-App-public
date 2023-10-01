import { Alert, AlertType, TaskFilter, TaskFilterType } from "models";
import { ColorSchemeName } from "react-native";
import Colors from "constants/Colors";
import dayjs from "dayjs";
import Strings from "constants/Strings";
import { groupBy } from "./arrayUtils";

const localizedFormat = require("dayjs/plugin/localizedFormat");
dayjs.extend(localizedFormat);

export function alertLabelOfType(type: AlertType): string {
   switch (type) {
      case AlertType.HandSignalAlert:
         return "Hand Signal Alert";
      case AlertType.GenericAlert:
         return "Generic Alert";
      case AlertType.EmergencyAlert:
         return "Emergency Alert";
   }
}

export function alertNameOfType(type: AlertType): string {
   switch (type) {
      case AlertType.HandSignalAlert:
         return "HandSignalAlert";
      case AlertType.GenericAlert:
         return "GenericAlert";
      case AlertType.EmergencyAlert:
         return "EmergencyAlert";
   }
}

export function alertFromLabel(typeLabel: string): AlertType {
   if (typeLabel === "HandSignalAlert") return AlertType.HandSignalAlert;
   if (typeLabel === "GenericAlert") return AlertType.GenericAlert;
   if (typeLabel === "EmergencyAlert") return AlertType.EmergencyAlert;

   return undefined;
}

export function alertTypeFromName(typeName: string): AlertType {
   if (typeName === "HandSignalAlert") return AlertType.HandSignalAlert;
   if (typeName === "GenericAlert") return AlertType.GenericAlert;
   if (typeName === "EmergencyAlert") return AlertType.EmergencyAlert;

   return undefined;
}

export function alertColorOf(
   alertType: AlertType,
   colorScheme: ColorSchemeName
): string {
   switch (alertType) {
      case AlertType.HandSignalAlert:
         return Colors[colorScheme].handSignalAlert;
      case AlertType.GenericAlert:
         return Colors[colorScheme].genericAlert;
      case AlertType.EmergencyAlert:
         return Colors[colorScheme].emergencyAlert;
   }
}

export function checkableAlertColorOf(
   alert: Alert,
   colorScheme: ColorSchemeName
): string {
   const { check } = alert;

   if (check.marked) return Colors[colorScheme].checkedAlert;

   return alertColorOf(alert.type, colorScheme);
}

export function addInfoTo(alert: Alert): Alert {
   let formattedInfo = alert.info;
   // add alert info description
   if (!!formattedInfo) formattedInfo += "\n";
   else formattedInfo = "";

   const { timestamp, address, cam } = alert;
   formattedInfo += formattedAlertInfo(timestamp, address, cam);

   const alertWithFormattedInfo = new Alert(alert);
   alertWithFormattedInfo.info = formattedInfo;
   return alertWithFormattedInfo;
}

export function formattedDateOf(timestamp: string): string {
   const dateTime = dayjs(timestamp);

   if (!dateTime) return ""; // error

   const formattedDate = dateTime.format("YYYY-MM-DD"); // ISO date
   const now = dayjs();

   if (formattedDate === now.format("YYYY-MM-DD"))
      // today
      return "Today";

   if (formattedDate === now.add(-1, "day").format("YYYY-MM-DD"))
      // yesterday
      return "Yesterday";

   if (formattedDate === now.add(1, "day").format("YYYY-MM-DD"))
      // tomorrow
      return "Tomorrow";

   return dateTime.format("ll");
}

export function formattedAlertInfo(
   timestamp: string,
   address?: string | null,
   cam?: string | null
): string {
   const dayjsTimestamp = dayjs(new Date(timestamp));

   const localTime = dayjsTimestamp.format("LTS");
   const localDate = dayjsTimestamp.format("L");
   const byCam = cam ? ` by Cam ${cam}` : "";

   const shortAddress = address ? ` in ${address.split(",", 1)[0]}` : "";

   return `Detected${shortAddress} at ${localTime} on ${localDate}${byCam}`;
}

export function alertFilterCallback(
   alert: Alert,
   filter: string,
   onlyUncheckedFilter: boolean
): boolean {
   const selectedType = alertFromLabel(filter);

   if (selectedType === undefined)
      return !onlyUncheckedFilter || !alert.check.marked;

   return (
      alert.type === selectedType &&
      (!onlyUncheckedFilter || !alert.check.marked)
   );
}

export function taskFilterCallback(task: Alert, filter: TaskFilter): boolean {
   if (!filter) return false;

   if (filter.type === TaskFilterType.all) {
      return true;
   }

   if (filter.type === TaskFilterType.todo) {
      return !task.check.marked;
   }

   if (filter.type === TaskFilterType.done) {
      return task.check.marked;
   }

   return false;
}

/* Alerts statistics */

export type AlertsLastMonthsStatistics = {
   monthData: number[][]; // one (ordered) list of labels for each of the previous 12 months; each list contains ordered counts of alert types for that month
   monthLabels: string[]; // one (ordered) label for each of the previous 12 months
   overallData: number[]; // one count for each alert type
   overallPercentageData: number[]; // one percentage for each alert type
};

export function computeAlertsLastMonthsStatistics(
   allAlerts: Alert[],
   maxLastMonths: number
): AlertsLastMonthsStatistics {
   // group alerts by month
   const groupedAlertsByMonth = groupBy(allAlerts, alert =>
      dayjs(alert.timestamp).format("YYYY-MM")
   );

   const now = dayjs();
   let lastMonthsGroupedAlertsByMonth = groupedAlertsByMonth;

   // add missing months among the last 9
   for (let i = 0; i < maxLastMonths; i++) {
      const month = now.subtract(i, "month").format("YYYY-MM");

      if (
         lastMonthsGroupedAlertsByMonth.findIndex(
            monthGroup => monthGroup.key === month
         ) === -1
      ) {
         // month not found: add it
         lastMonthsGroupedAlertsByMonth.push({ key: month, data: [] });
      }
   }

   // sort in inverse chronological order and take the last 9 months
   lastMonthsGroupedAlertsByMonth = lastMonthsGroupedAlertsByMonth
      .sort((group1, group2) => {
         // sort the groups by month
         const month1 = group1.key;
         const month2 = group2.key;

         if (month1 === month2) return 0;
         if (month1 < month2) return 1;
         if (month1 > month2) return -1;
      })
      .slice(0, maxLastMonths)
      .reverse(); // reverse them in cronological order

   // find first month with #alerts > 0
   const firstMonthWithAlertsIndex = lastMonthsGroupedAlertsByMonth.findIndex(
      monthGroup => monthGroup.data.length > 0
   );

   if (firstMonthWithAlertsIndex === -1) {
      // if no alerts in the last 9 months, keep just the last months with 0 alerts
      lastMonthsGroupedAlertsByMonth = lastMonthsGroupedAlertsByMonth.slice(-1);
   } else {
      // keep just the months starting from the first having #alerts > 0
      lastMonthsGroupedAlertsByMonth = lastMonthsGroupedAlertsByMonth.slice(
         firstMonthWithAlertsIndex
      );
   }

   // map them to alert type counts
   const statisticsData = lastMonthsGroupedAlertsByMonth.map(monthGroup => {
      const monthAlerts = monthGroup.data;

      const handSignalAlertsCount = monthAlerts.filter(
         alert => alert.type === AlertType.HandSignalAlert
      ).length;

      const genericAlertsCount = monthAlerts.filter(
         alert => alert.type === AlertType.GenericAlert
      ).length;

      const emergencyAlertsCount = monthAlerts.filter(
         alert => alert.type === AlertType.EmergencyAlert
      ).length;

      return [handSignalAlertsCount, genericAlertsCount, emergencyAlertsCount];
   });

   // map to months
   const statisticsLabels = lastMonthsGroupedAlertsByMonth.map(monthGroup => {
      const yearMonth = monthGroup.key;
      const monthStr = yearMonth.split("-")[1];
      const month = Number(monthStr);
      const monthLabel = `${Strings.en.months[month - 1].substring(0, 3)}   `; // e.g. Ja, Fe, Ma, Ap, ...
      return monthLabel;
   });

   // last year overall counts
   const lastYearHandSignalCount = statisticsData
      .map(monthAlertTypesCounts => monthAlertTypesCounts[0])
      .reduce((x, y) => x + y, 0);

   const lastYearGenericCount = statisticsData
      .map(monthAlertTypesCounts => monthAlertTypesCounts[1])
      .reduce((x, y) => x + y, 0);

   const lastYearEmergencyCount = statisticsData
      .map(monthAlertTypesCounts => monthAlertTypesCounts[2])
      .reduce((x, y) => x + y, 0);

   const overallCount =
      lastYearHandSignalCount + lastYearGenericCount + lastYearEmergencyCount;

   const overallHandSignalPercentage =
      overallCount === 0 ? 0 : lastYearHandSignalCount / overallCount;

   const overallGenericPercentage =
      overallCount === 0 ? 0 : lastYearGenericCount / overallCount;

   const overallEmergencyPercentage =
      overallCount === 0 ? 0 : lastYearEmergencyCount / overallCount;

   return {
      monthData: statisticsData,
      monthLabels: statisticsLabels,
      overallData: [
         lastYearHandSignalCount,
         lastYearGenericCount,
         lastYearEmergencyCount,
      ],
      overallPercentageData: [
         overallHandSignalPercentage,
         overallGenericPercentage,
         overallGenericPercentage,
      ],
   };
}
