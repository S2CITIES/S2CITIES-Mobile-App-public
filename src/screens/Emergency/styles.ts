import { appPrimaryBlue } from "constants/Colors";
import Dimensions from "constants/Dimensions";
import { StyleSheet } from "react-native";

type EmergencyStylesProps = {
   mainContainer;
   emergencyTitle;
   emergencyButtonText;
   emergencyButton;
   emergencyButtonWrapper;
};

export const styles: EmergencyStyles = StyleSheet.create({
   mainContainer: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
   },
   emergencyTitle: {
      fontSize: Dimensions.emergency.titleSize,
      fontFamily: "lato-black",
      position: "absolute",
      top: Dimensions.emergency.titleTopPadding,
      textAlign: "center",
      paddingHorizontal: Dimensions.emergency.titlePaddingHorizontal,
   },
   emergencyButtonText: {
      fontSize: Dimensions.emergency.buttonFontSize,
      fontFamily: "lato-black",
      textAlign: "center",
   },
   emergencyButton: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 1000,
      backgroundColor: appPrimaryBlue,
   },
   emergencyButtonWrapper: {
      padding: Dimensions.emergency.buttonWrapperDefaultPadding,
      borderRadius: 1000,
      borderWidth: Dimensions.emergency.buttonWrapperBorderWidth,
      borderColor: appPrimaryBlue,
   },
});

export type EmergencyStyles = StyleSheet.NamedStyles<EmergencyStylesProps>;
