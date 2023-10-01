import Dimensions from "constants/Dimensions";
import { StyleSheet } from "react-native";

type DashboardStylesProps = {
   mainContainer;
   alertsSectionList;
   placeholderText;
   statisticsBox;
   ringChartsWrapper;
};

export const styles = StyleSheet.create({
   mainContainer: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "stretch",
   },
   alertsSectionList: {
      paddingTop: Dimensions.mainContainer.defaultPaddingTop,
      paddingBottom: Dimensions.mainContainer.defaultPaddingBottom,
   },
   placeholderText: {
      fontSize: 30,
      fontFamily: "lato-bold",
      marginVertical: 40,
      textAlign: "center",
   },
   statisticsBox: {
      paddingHorizontal: 30,
      paddingBottom: 30,
      paddingTop: 20,
   },
   ringChartsWrapper: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
   },
});

export type DashboardStyles = StyleSheet.NamedStyles<DashboardStylesProps>;
