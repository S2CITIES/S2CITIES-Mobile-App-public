import { appDarkGrey, appGrey } from "constants/Colors";
import Dimensions from "constants/Dimensions";
import { StyleSheet } from "react-native";

type LoginStylesProps = {
   mainContainer;
   mainContainerElement;
   titleText;
   formFieldLabel;
   formFieldInputText;
   signInButtonText;
   buttonWrapper;
   backArrow;
   backArrowWrapper;
   errorText;
};

export const styles: LoginStyles = StyleSheet.create({
   mainContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "stretch",
      paddingHorizontal: Dimensions.login.mainContainerPaddingHorizontal,
      paddingVertical: Dimensions.login.mainContainerPaddingVertical,
   },
   mainContainerElement: {
      marginVertical: Dimensions.login.mainContainerElementMarginVertical,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "stretch",
   },
   titleText: {
      fontFamily: "lato-black",
      fontSize: Dimensions.login.titleFontSize,
      textAlign: "left",
   },
   formFieldLabel: {
      fontFamily: "lato-black",
      fontSize: Dimensions.login.formFieldLabelSize,
   },
   formFieldInputText: {
      fontFamily: "lato-bold",
      fontSize: Dimensions.login.formFieldInputTextSize,
      marginTop: 12,
      height: Dimensions.login.formFieldInputTextSize + 20,
      borderBottomWidth: 2,
      borderBottomColor: appGrey,
   },
   signInButtonText: {
      fontFamily: "lato-regular",
      fontSize: Dimensions.login.mainButtonTextSize,
   },
   buttonWrapper: {
      display: "flex",
      flexDirection: "row",
   },
   backArrow: {
      marginLeft: 0,
   },
   backArrowWrapper: {
      alignSelf: "flex-start",
      paddingRight: 50,
      paddingVertical: 20,
   },
   errorText: {
      fontFamily: "lato-regular",
      fontSize: Dimensions.login.errorTextSize,
      marginBottom: 10,
   },
});

export type LoginStyles = StyleSheet.NamedStyles<LoginStylesProps>;
