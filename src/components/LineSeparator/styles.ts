import Dimensions from "constants/Dimensions";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
   separatorBox: {
      flex: 1,
      paddingTop: Dimensions.lineSeparator.defaultMarginTop,
      marginBottom: Dimensions.lineSeparator.defaultMarginBottom,
      marginStart: Dimensions.lineSeparator.defaultMarginStart,
      marginEnd: Dimensions.lineSeparator.defaultMarginEnd,
      backgroundColor: "#ffffff00",
      display: "flex",
      flexDirection: "column",
      alignItems: "stretch",
   },
   separatorLabel: {
      paddingVertical: Dimensions.lineSeparator.verticalSpacing,
      marginHorizontal: Dimensions.lineSeparator.labelMarginHorizontal,
      fontFamily: "inter-regular",
      fontSize: Dimensions.lineSeparator.labelSize,
      alignSelf: "flex-start",
   },
   separatorLine: {
      marginVertical: Dimensions.lineSeparator.verticalSpacing,
      height: Dimensions.lineSeparator.thickness,
   },
});
