import { appGrey } from "constants/Colors";
import Dimensions from "constants/Dimensions";
import { StyleSheet } from "react-native";

type AddAlertStylesProps = {
   mainContainer;
   videoContainer;
   alertDataContainer;
   alertDataContainerElement;
   formFieldLabel;
   formFieldInputText;
   alertInfoInputText;
   locationInputText;
   createAlertButtonWrapper;
   createAlertButtonText;
   errorText;
   locationLoadingWrapper;
   locationLoadingText;
   deleteVideoIconWrapper;
   videoRequiredText;
};

export const styles: AddAlertStyles = StyleSheet.create({
   mainContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "stretch",
   },
   videoContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "stretch",
      backgroundColor: appGrey,
   },
   alertDataContainer: {
      display: "flex",
      paddingHorizontal: Dimensions.addAlert.alertDataContainerMarginHorizontal,
      paddingVertical: Dimensions.addAlert.alertDataContainerMarginVertical,
   },
   alertDataContainerElement: {
      marginVertical:
         Dimensions.addAlert.alertDataContainerElementMarginVertical,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "stretch",
   },
   formFieldLabel: {
      fontFamily: "lato-black",
      fontSize: Dimensions.addAlert.formFieldLabelSize,
   },
   formFieldInputText: {
      fontFamily: "lato-regular",
      fontSize: Dimensions.addAlert.formFieldInputTextSize,
      marginTop: 12,
      borderWidth: 0.25,
      borderColor: appGrey,
      paddingHorizontal:
         Dimensions.addAlert.formFieldInputTextPaddingHorizontal,
   },
   alertInfoInputText: {
      height: Dimensions.addAlert.alertInfoInputTextHeight,
   },
   locationInputText: {
      height: Dimensions.addAlert.locationInputTextHeight,
   },
   createAlertButtonWrapper: {
      marginVertical: Dimensions.addAlert.createAlertButtonMarginVertical,
   },
   createAlertButtonText: {
      fontFamily: "lato-black",
      fontSize: Dimensions.addAlert.createAlertButtonTextSize,
   },
   errorText: {
      fontFamily: "lato-regular",
      fontSize: Dimensions.login.errorTextSize,
      marginVertical: 5,
   },
   locationLoadingWrapper: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginVertical: Dimensions.addAlert.locationLoadingMarginVertical,
   },
   locationLoadingText: {
      fontFamily: "lato-regular",
      fontSize: Dimensions.addAlert.locationLoadingTextSize,
      marginEnd: Dimensions.addAlert.locationLoadingTextMarginEnd,
   },
   deleteVideoIconWrapper: {
      position: "absolute",
      top: 0,
      right: 0,
      padding: 16,
      backgroundColor: "#ffffff00",
   },
   videoRequiredText: {
      fontFamily: "lato-italic",
      fontSize: 13,
      marginTop: 5,
      marginBottom: -10,
      marginStart: 10,
   },
});

export type AddAlertStyles = StyleSheet.NamedStyles<AddAlertStylesProps>;
