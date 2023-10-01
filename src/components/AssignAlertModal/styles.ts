import Dimensions from "constants/Dimensions";
import { StyleSheet } from "react-native";

type AssignAlertModalStylesProps = {
   overlayContainer;
   title;
   buttonsRow;
   buttonText;
   userRow;
   usersList;
   userName;
};

export const styles: AssignAlertModalStyles = StyleSheet.create({
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
   userRow: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      paddingVertical: 8,
   },
   usersList: {
      paddingHorizontal: 20,
      marginBottom: 10,
   },
   userName: {
      fontFamily: "lato-bold",
      fontSize: 18,
      marginStart: 5,
   },
});

export type AssignAlertModalStyles =
   StyleSheet.NamedStyles<AssignAlertModalStylesProps>;
