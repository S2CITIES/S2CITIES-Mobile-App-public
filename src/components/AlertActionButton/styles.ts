import Dimensions from "constants/Dimensions";
import { ImageStyle, StyleSheet } from "react-native";

type AlertActionButtonStylesProps = {
   buttonContainer;
   actionLabel;
   iconBox;
};

export const styles: AlertActionButtonStyles = StyleSheet.create({
   buttonContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "center",
      padding: Dimensions.alertDetail.alertActionBoxPadding,
   },
   actionLabel: {
      fontFamily: "lato-black",
      textAlign: "center",
      fontSize: Dimensions.alertDetail.alertActionLabelSize,
      margin: Dimensions.alertDetail.alertActionItemMargin,
   },
   iconBox: {
      margin: Dimensions.alertDetail.alertActionItemMargin,
   },
});

export type AlertActionButtonStyles =
   StyleSheet.NamedStyles<AlertActionButtonStylesProps>;
