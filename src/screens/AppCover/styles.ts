import { white } from "constants/Colors";
import Dimensions from "constants/Dimensions";
import { StyleSheet } from "react-native";

type AppCoverStylesProps = {
   mainContainer;
   signInButtonText;
   buttonWrapper;
   mottoText;
};

export const styles: AppCoverStyles = StyleSheet.create({
   mainContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      alignItems: "center",
      height: "100%",
      width: "100%",
      paddingHorizontal: Dimensions.cover.containerPaddingHorizontal,
      paddingVertical: Dimensions.cover.containerPaddingVertical,
   },
   signInButtonText: {
      fontFamily: "lato-regular",
      fontSize: Dimensions.cover.mainButtonTextSize,
   },
   buttonWrapper: {
      display: "flex",
      flexDirection: "row",
   },
   mottoText: {
      fontFamily: "lato-regular",
      fontSize: Dimensions.cover.mottoTextSize,
      textAlign: "center",
      color: white,
   },
});

export type AppCoverStyles = StyleSheet.NamedStyles<AppCoverStylesProps>;
