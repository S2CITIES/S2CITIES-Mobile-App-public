import React, { memo } from "react";
import { View as DefaultView } from "react-native";
import { useAlertsFrequencyBarChart } from "./index.hooks";
import { StackedBarChart } from "react-native-chart-kit";
import Colors from "constants/Colors";
import Strings from "constants/Strings";

type AlertsFrequencyBarChartProps = {
   labels: string[];
   data: number[][];
   chartWidth: number;
};

export const AlertsFrequencyBarChart = memo(
   ({ labels, data, chartWidth }: AlertsFrequencyBarChartProps) => {
      const { styles, safeAreaFrame, colorScheme } =
         useAlertsFrequencyBarChart();

      return (
         <DefaultView
            style={{
               display: "flex",
               flexDirection: "column",
               justifyContent: "center",
               alignItems: "center",
               paddingRight: safeAreaFrame.width / 11.0,
            }}>
            <StackedBarChart
               data={{
                  labels: labels,
                  legend: [
                     Strings.en.alert_type_hand_signal_alert,
                     Strings.en.alert_type_generic_alert,
                     Strings.en.alert_type_emergency_alert,
                  ],
                  data: data,
                  barColors: [
                     Colors[colorScheme].handSignalAlert,
                     Colors[colorScheme].genericAlert,
                     Colors[colorScheme].emergencyAlert,
                  ],
               }}
               width={chartWidth}
               height={220}
               chartConfig={{
                  backgroundGradientFrom: "#00000000",
                  backgroundGradientFromOpacity: 0,
                  backgroundGradientTo: "#00000000",
                  backgroundGradientToOpacity: 0,
                  color: (opacity = 1) =>
                     `${Colors[colorScheme].lineSeparator}33`,
                  strokeWidth: 2, // optional, default 3
                  barPercentage:
                     labels.length === 0 ? 1.0 : 2.5 / labels.length,
                  useShadowColorFromDataset: false, // optional
                  labelColor: () => Colors[colorScheme].text,
                  propsForLabels: {
                     fontSize: 12,
                  },
                  barRadius: 2.0,
               }}
               hideLegend={true}
               segments={4}
               decimalPlaces={0}
               xLabelsOffset={0}
               yLabelsOffset={0}
            />
         </DefaultView>
      );
   }
);

AlertsFrequencyBarChart.displayName = "AlertsFrequencyBarChart";
