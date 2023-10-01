import Dimensions from "constants/Dimensions";
import { StyleSheet } from "react-native";

type AppModalStylesProps = {
   overlayContainer;
   title;
   buttonsRow;
   buttonText;
};

export const styles: AppModalStyles = StyleSheet.create({
   overlayContainer: {
      display: "flex",
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
   },
   title: {
      textAlign: "center",
      fontFamily: "lato-black",
      fontSize: Dimensions.modal.textSize,
      marginVertical: Dimensions.modal.textMarginVertical,
      paddingHorizontal: Dimensions.modal.textPaddingHorizontal,
      lineHeight: Dimensions.modal.textLineHeight,
   },
   buttonsRow: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "stretch",
      marginVertical: Dimensions.modal.buttonsMarginVertical,
   },
   buttonText: {
      fontFamily: "lato-black",
      fontSize: Dimensions.modal.buttonTextSize,
   },
});

export type AppModalStyles = StyleSheet.NamedStyles<AppModalStylesProps>;
