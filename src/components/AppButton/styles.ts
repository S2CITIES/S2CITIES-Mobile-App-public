import Dimensions from "constants/Dimensions";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
   appButtonContainer: {
      borderRadius: Dimensions.smallAlertCard.defaultAppButtonBorderRadius,
      paddingVertical: 8,
      paddingHorizontal: 12,
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
   },
   appButtonText: {
      fontSize: 15,
      fontFamily: "lato-bold",
      alignSelf: "center",
   },
});
