import { appPrimaryBlue } from "constants/Colors";
import Dimensions from "constants/Dimensions";
import { StyleSheet } from "react-native";

type SmallAlertCardStylesProps = {
   alertCardContentBox;
   alertInfoColumn;
   timeColumn;
   alertInfoTitle;
   bold;
   alertInfoAddress;
};

export const styles: SmallAlertCardStyles = StyleSheet.create({
   alertCardContentBox: {
      backgroundColor: `${appPrimaryBlue}00`, // transparent, but appPrimaryBlue as base color
      display: "flex",
      flexDirection: "row",
      flexWrap: "nowrap",
      alignItems: "center",
   },
   alertInfoColumn: {
      backgroundColor: `${appPrimaryBlue}00`, // transparent, but appPrimaryBlue as base color
      flex: 1,
      display: "flex",
      flexDirection: "column",
   },
   alertInfoTitle: {
      fontFamily: "lato-regular",
      fontSize: Dimensions.smallAlertCard.textSize,
      marginVertical: Dimensions.smallAlertCard.textRowVerticalMargin,
   },
   bold: {
      fontFamily: "lato-black",
   },
   alertInfoAddress: {
      fontFamily: "lato-italic",
      marginVertical: Dimensions.smallAlertCard.textRowVerticalMargin,
      fontSize: Dimensions.smallAlertCard.textSize,
   },
   timeColumn: {
      fontFamily: "lato-regular",
      textAlign: "right",
      fontSize: Dimensions.smallAlertCard.textSize,
   },
});

export type SmallAlertCardStyles =
   StyleSheet.NamedStyles<SmallAlertCardStylesProps>;
