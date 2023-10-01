import Dimensions from "constants/Dimensions";
import { StyleSheet } from "react-native";

type AlertsHeaderStylesProps = {
   headerWrapper;
   headerRow;
   alertInfoCentralBox;
   alertTitleLabel;
   alertTypeLabel;
   alertAddressLabel;
   alertLocalTimeLabel;
   alertLocalTimeWrapper;
   backArrow;
};

export const styles = StyleSheet.create({
   headerWrapper: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      alignItems: "stretch",
   },
   headerRow: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "stretch",
   },
   alertInfoCentralBox: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: Dimensions.alertDetail.alertsHeaderPaddingVertical,
   },
   alertTitleLabel: {
      fontFamily: "lato-regular",
      fontSize: Dimensions.smallAlertCard.textSize,
      marginVertical: Dimensions.smallAlertCard.textRowVerticalMargin,
   },
   alertTypeLabel: {
      fontFamily: "lato-black",
   },
   alertAddressLabel: {
      fontFamily: "lato-italic",
      marginVertical: Dimensions.smallAlertCard.textRowVerticalMargin,
      fontSize: Dimensions.smallAlertCard.textSize,
      maxWidth: 230,
      textAlign: "center",
   },
   alertLocalTimeLabel: {
      marginRight: Dimensions.topBarRightIcon.marginRight,
      fontFamily: "lato-regular",
      fontSize: 14,
   },
   alertLocalTimeWrapper: {
      display: "flex",
      justifyContent: "center",
   },
   backArrow: {
      paddingRight: 12,
      display: "flex",
      justifyContent: "center",
   },
});

export type AlertsHeaderStyles =
   StyleSheet.NamedStyles<AlertsHeaderStylesProps>;
