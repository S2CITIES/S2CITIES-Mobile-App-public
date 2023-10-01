import React, { memo } from "react";
import { View as DefaultView } from "react-native";
import { useAlertsCountRingChart } from "./index.hooks";
import { ProgressChart } from "react-native-chart-kit";
import Colors from "constants/Colors";
import { Text } from "components/Themed";

type AlertsCountRingChartProps = {
   width: number;
   percentage: number;
   count: number;
   color: string;
   label: string;
};

export const AlertsCountRingChart = memo(
   ({ width, percentage, color, count, label }: AlertsCountRingChartProps) => {
      const { styles, colorScheme } = useAlertsCountRingChart();

      return (
         <DefaultView
            style={{
               display: "flex",
               flexDirection: "column",
               justifyContent: "flex-start",
               alignItems: "center",
            }}>
            <ProgressChart
               data={{
                  data: [percentage],
                  colors: [color],
                  labels: ["a"],
               }}
               width={width}
               height={width}
               strokeWidth={7.5}
               radius={(width * 1.1) / 3.0}
               chartConfig={{
                  backgroundGradientFrom: "#00000000",
                  backgroundGradientFromOpacity: 0,
                  backgroundGradientTo: "#00000000",
                  backgroundGradientToOpacity: 0,
                  color: (opacity = 1) =>
                     `${Colors[colorScheme].lineSeparator}22`,
                  useShadowColorFromDataset: false, // optional
                  labelColor: () => Colors[colorScheme].text,
                  propsForLabels: {
                     fontSize: 12,
                  },
               }}
               hideLegend={true}
               withCustomBarColorFromData
            />
            <Text
               style={{
                  fontFamily: "lato-bold",
                  fontSize: 15,
               }}>
               {count}
            </Text>

            <Text
               style={{
                  fontFamily: "lato-regular",
                  fontSize: 10,
                  position: "absolute",
                  top: width / 2 - 7,
               }}>
               {label}
            </Text>
         </DefaultView>
      );
   }
);

AlertsCountRingChart.displayName = "AlertsCountRingChart";
