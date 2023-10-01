import Dimensions from "constants/Dimensions";
import { StyleSheet } from "react-native";

type AlertsHeaderStylesProps = {
   mainHeader;
   filterLabel;
   filterBox;
   addButton;
};

export const styles: AlertsHeaderStyles = StyleSheet.create({
   mainHeader: {
      paddingHorizontal: Dimensions.alertsHeader.paddingHorizontal,
      paddingVertical: Dimensions.alertsHeader.paddingVertical,
   },
   filterLabel: {
      fontFamily: "lato-black",
      fontSize: Dimensions.alertsHeader.filterLabelSize,
      marginStart: Dimensions.alertsHeader.filterLabelSpacing,
   },
   filterBox: {
      flex: 1,
      display: "flex",
      flexDirection: "row",
      flexWrap: "nowrap",
      alignItems: "center",
      marginStart: 2.0,
      marginEnd: 30,
   },
   addButton: {
      paddingHorizontal: Dimensions.alertsHeader.addButtonPadding,
      paddingVertical: Dimensions.alertsHeader.addButtonPadding,
   },
});

type AlertsHeaderStyles = StyleSheet.NamedStyles<AlertsHeaderStylesProps>;
