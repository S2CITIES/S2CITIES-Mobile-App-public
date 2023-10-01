import { appRedError, white } from "constants/Colors";
import Dimensions from "constants/Dimensions";
import { StyleSheet } from "react-native";

type RecordAlertVideoStylesProps = {
   mainContainer;
   cameraView;
   videoButtonsWrapper;
   videoActionButtonText;
   videoStopwatchWrapper;
   videoStopwatchContainer;
   videoStopwatchText;
};

export const styles: RecordAlertVideoStyles = StyleSheet.create({
   mainContainer: {
      width: "100%",
      flex: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
   },
   cameraView: {
      width: "100%",
      flex: 1,
   },
   videoButtonsWrapper: {
      position: "absolute",
      bottom: Dimensions.recordAlertVideo.actionButtonBottomOffset,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
   },
   videoActionButtonText: {
      fontFamily: "lato-black",
      fontSize: Dimensions.recordAlertVideo.actionButtonTextSize,
      textAlign: "center",
   },
   videoStopwatchWrapper: {
      position: "absolute",
      top: Dimensions.recordAlertVideo.stopwatchTopOffset,
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
   },
   videoStopwatchContainer: {
      backgroundColor: appRedError,
      padding: Dimensions.recordAlertVideo.stopwatchTextPadding,
      borderRadius: Dimensions.recordAlertVideo.stopwatchBorderRadius,
   },
   videoStopwatchText: {
      fontFamily: "lato-regular",
      fontSize: Dimensions.recordAlertVideo.stopwatchTextSize,
      color: white,
   },
});

export type RecordAlertVideoStyles =
   StyleSheet.NamedStyles<RecordAlertVideoStylesProps>;
