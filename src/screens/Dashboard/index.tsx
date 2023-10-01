import React, { memo } from "react";
import { useDashboard } from "./index.hooks";
import {
   View,
   Text,
   LineSeparator,
   BigAlertCard,
   AlertsFrequencyBarChart,
   AlertsCountRingChart,
} from "components";
import { DashboardStackScreenProps } from "../../../types";
import { ScrollView, SectionList } from "react-native";
import { formattedDateOf } from "utils";
import { actions } from "redux-store";
import Strings from "constants/Strings";
import Colors from "constants/Colors";
import { useNotificationListenerToNavigateFromRootToProperView } from "utils/pushNotifications";

type DashboardProps = {} & DashboardStackScreenProps<"DashboardPage">;

export const Dashboard = memo(({ navigation }: DashboardProps) => {
   const {
      styles,
      colorScheme,
      safeAreaFrame,
      alertsLastMonthsStatistics,
      dashboardAlerts,
      groupedDashboardAlerts,
      areAlertsLoading,
      dispatch,
   } = useDashboard();

   const chartWidth = (safeAreaFrame.width * 3.3) / 4.0;

   useNotificationListenerToNavigateFromRootToProperView(navigation);

   return (
      <ScrollView>
         <View style={styles.mainContainer}>
            {(dashboardAlerts.length > 0 || areAlertsLoading) && (
               <SectionList
                  style={{
                     paddingVertical: dashboardAlerts.length > 0 ? 0 : 20,
                  }}
                  sections={groupedDashboardAlerts}
                  keyExtractor={item => item._id}
                  renderItem={({ item }) => (
                     <BigAlertCard
                        alert={item}
                        goToAlertDetail={() =>
                           navigation.navigate(
                              "DashboardAlertDetail",
                              item.toHeaderInfo()
                           )
                        }
                     />
                  )}
                  renderSectionHeader={({ section }) => {
                     const formattedDate = formattedDateOf(
                        section.data[0].timestamp
                     );
                     return <LineSeparator label={formattedDate} />;
                  }}
                  stickySectionHeadersEnabled={false}
                  contentContainerStyle={styles.alertsSectionList}
                  refreshing={areAlertsLoading}
                  onRefresh={() => {
                     // update alerts
                     dispatch(actions.getAlerts.request({}));

                     // update zones
                     dispatch(actions.getZones.request({}));

                     // update users
                     dispatch(actions.getUsers.request({}));
                  }}
               />
            )}

            {!areAlertsLoading && dashboardAlerts.length === 0 && (
               <Text style={styles.placeholderText}>
                  No recent alerts to check
               </Text>
            )}

            {dashboardAlerts.length > 0 && (
               <LineSeparator
                  label={Strings.en.alerts_statistics_dashboard_label}
               />
            )}

            {/* alerts statistics */}
            {dashboardAlerts.length > 0 && (
               <View style={styles.statisticsBox}>
                  {/* stacked bar chart */}
                  <AlertsFrequencyBarChart
                     labels={alertsLastMonthsStatistics.monthLabels}
                     data={alertsLastMonthsStatistics.monthData}
                     chartWidth={chartWidth}
                  />

                  {/* ring charts */}
                  <View style={styles.ringChartsWrapper}>
                     {/* hand signal alerts ring */}
                     <AlertsCountRingChart
                        width={chartWidth / 3}
                        percentage={
                           alertsLastMonthsStatistics.overallPercentageData[0]
                        }
                        color={Colors[colorScheme].handSignalAlert}
                        count={alertsLastMonthsStatistics.overallData[0]}
                        label={
                           Strings.en.alert_type_hand_signal_alert.split(" ")[0]
                        }
                     />
                     {/* generic alerts ring */}
                     <AlertsCountRingChart
                        width={chartWidth / 3}
                        percentage={
                           alertsLastMonthsStatistics.overallPercentageData[1]
                        }
                        color={Colors[colorScheme].genericAlert}
                        count={alertsLastMonthsStatistics.overallData[1]}
                        label={
                           Strings.en.alert_type_generic_alert.split(" ")[0]
                        }
                     />
                     {/* emergency alerts ring */}
                     <AlertsCountRingChart
                        width={chartWidth / 3}
                        percentage={
                           alertsLastMonthsStatistics.overallPercentageData[2]
                        }
                        color={Colors[colorScheme].emergencyAlert}
                        count={alertsLastMonthsStatistics.overallData[2]}
                        label={
                           Strings.en.alert_type_emergency_alert.split(" ")[0]
                        }
                     />
                  </View>
               </View>
            )}
         </View>
      </ScrollView>
   );
});

Dashboard.displayName = "Dashboard";
