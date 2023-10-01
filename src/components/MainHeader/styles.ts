import Dimensions from "constants/Dimensions";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
   header: {
      alignSelf: "stretch",
      paddingHorizontal: Dimensions.mainHeader.paddingHorizontal,
      paddingVertical: Dimensions.mainHeader.paddingVertical,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
   },
});
