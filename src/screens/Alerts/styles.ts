import Dimensions from "constants/Dimensions";
import { StyleSheet } from "react-native";

type AlertsStylesProps = {
   mainContainer;
   placeholderText;
   tempAlertText;
   alertsSectionList;
   uncheckedFilterCheckboxWrapper;
   uncheckedFilterLabel;
};

export const styles: AlertsStyles = StyleSheet.create({
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
   tempAlertText: {
      fontSize: 10,
      color: "#f11",
   },
   uncheckedFilterCheckboxWrapper: {
      position: "absolute",
      bottom: -5,
      right: 0,
      padding: 20,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
   },
   uncheckedFilterLabel: {
      fontFamily: "lato-black",
      fontSize: 10,
      textAlign: "center",
      marginBottom: -5,
   },
});

export type AlertsStyles = StyleSheet.NamedStyles<AlertsStylesProps>;
