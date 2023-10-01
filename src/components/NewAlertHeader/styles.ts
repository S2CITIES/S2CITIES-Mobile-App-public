import Dimensions from "constants/Dimensions";
import { StyleSheet } from "react-native";

type NewAlertHeaderStylesProps = {
   headerWrapper;
   headerRow;
   alertInfoCentralBox;
   alertTitleLabel;
   alertLocalTimeLabel;
   alertLocalTimeWrapper;
   backArrow;
};

export const styles: NewAlertHeaderStyles = StyleSheet.create({
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
      paddingVertical: Dimensions.alertDetail.alertsHeaderPaddingVertical + 8,
      marginStart: -48,
   },
   alertTitleLabel: {
      fontFamily: "lato-black",
      fontSize: Dimensions.smallAlertCard.textSize,
      marginVertical: Dimensions.smallAlertCard.textRowVerticalMargin,
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

export type NewAlertHeaderStyles =
   StyleSheet.NamedStyles<NewAlertHeaderStylesProps>;
