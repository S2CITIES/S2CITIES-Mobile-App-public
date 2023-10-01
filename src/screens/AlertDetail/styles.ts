import Dimensions from "constants/Dimensions";
import { StyleSheet } from "react-native";

type AlertDetailStylesProp = {
   alertActionsRow;
   alertInfoBox;
   alertInfoTitle;
   alertInfoDescription;
   alertAddressRow;
   alertAddressText;
};

export const styles: AlertDetailStyles = StyleSheet.create({
   alertActionsRow: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "stretch",
      borderWidth: Dimensions.alertDetail.alertActionsRowBorderWidth,
   },
   alertInfoBox: {
      display: "flex",
      flexDirection: "column",
      marginHorizontal: Dimensions.alertDetail.alertInfoMarginHorizontal,
      marginVertical: Dimensions.alertDetail.alertInfoMarginVertical,
   },
   alertInfoTitle: {
      fontFamily: "lato-black",
      fontSize: Dimensions.alertDetail.alertInfoTextSize,
      marginVertical: Dimensions.alertDetail.alertInfoSeparationMarginVertical,
   },
   alertInfoDescription: {
      fontFamily: "lato-regular",
      fontSize: Dimensions.alertDetail.alertInfoTextSize,
      marginVertical: Dimensions.alertDetail.alertInfoSeparationMarginVertical,
      lineHeight: Dimensions.alertDetail.alertInfoDescriptionLineHeight,
   },
   alertAddressRow: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      marginHorizontal: Dimensions.alertDetail.alertAddressMarginHorizontal,
   },
   alertAddressText: {
      fontFamily: "lato-regular",
      textDecorationLine: "underline",
      marginHorizontal: Dimensions.alertDetail.alertAddressItemsSeparation,
      paddingEnd: Dimensions.alertDetail.alertAddressItemsSeparation,
      fontSize: Dimensions.alertDetail.alertAddressTextSize,
   },
});

export type AlertDetailStyles = StyleSheet.NamedStyles<AlertDetailStylesProp>;
