import React, { memo } from "react";
import { View as DefaultView } from "react-native";
import { useRecordAlertVideo } from "./index.hooks";
import { RootStackScreenProps } from "../../../types";
import { AppButton } from "components";
import PlayIcon from "components/svg/PlayIcon";
import Colors, { appRedError, white } from "constants/Colors";
import { Camera, CameraType, FlashMode } from "expo-camera";
import StopIcon from "components/svg/StopIcon";
import { Stopwatch } from "react-native-stopwatch-timer";
import FlashIcon from "components/svg/FlashIcon";
import FlipCameraIcon from "components/svg/FlipCameraIcon";
import Dimensions from "constants/Dimensions";
import { alertColorOf } from "utils";
import NoFlashIcon from "components/svg/NoFlashIcon";
import * as Haptics from "expo-haptics";

type RecordAlertVideoProps = {} & RootStackScreenProps<"RecordAlertVideo">;

export const RecordAlertVideo = memo(
   ({ route, navigation }: RecordAlertVideoProps) => {
      const { type: alertType } = route.params;

      const {
         styles,
         window,
         insets,
         safeAreaFrame,
         colorScheme,
         recording,
         startRecording,
         stopRecording,
         setCameraRef,
         videoPermission,
         cameraType,
         toggleCameraType,
         flashMode,
         toggleFlashMode,
      } = useRecordAlertVideo({
         navigation,
         alertType,
      });

      const mainButtonWidth = safeAreaFrame.width * (1.0 / 4.0);
      const mainButtonHeight = mainButtonWidth * (19 / 20);

      const secondaryButtonWidth = mainButtonWidth * (3.2 / 5.0);
      const secondaryButtonHeight = mainButtonHeight * (3.2 / 5.0);

      return (
         <DefaultView style={[styles.mainContainer, { height: window.height }]}>
            {videoPermission?.granted && (
               <Camera
                  ref={setCameraRef}
                  style={styles.cameraView}
                  type={cameraType}
                  flashMode={flashMode}
               />
            )}

            {/* stopwatch */}
            {recording && (
               <DefaultView style={styles.videoStopwatchWrapper}>
                  <Stopwatch
                     start={recording}
                     reset={!recording}
                     options={{
                        container: styles.videoStopwatchContainer,
                        text: styles.videoStopwatchText,
                     }}
                  />
               </DefaultView>
            )}

            {/* video buttons */}
            <DefaultView
               style={[
                  styles.videoButtonsWrapper,
                  {
                     bottom:
                        insets.bottom +
                        Dimensions.recordAlertVideo.actionButtonBottomOffset,
                     paddingHorizontal: insets.left + 15,
                  },
               ]}>
               {/* flash button */}
               <DefaultView
                  style={{
                     width: secondaryButtonWidth,
                     height: secondaryButtonHeight,
                  }}>
                  <AppButton
                     flexGrow={1}
                     textStyle={styles.videoActionButtonText}
                     color={
                        flashMode === FlashMode.off ||
                        cameraType === CameraType.front
                           ? Colors[colorScheme].checkedAlert
                           : alertColorOf(alertType, colorScheme)
                     }
                     height={secondaryButtonHeight}
                     offset={[1.3, 2.0]}
                     startColor={"#00000077"}
                     borderRadius={1000}
                     onPress={() => toggleFlashMode()}
                     disabled={cameraType === CameraType.front}>
                     {flashMode === FlashMode.off ||
                     cameraType === CameraType.front ? (
                        <NoFlashIcon color={white} size={30} />
                     ) : (
                        <FlashIcon color={white} size={30} />
                     )}
                  </AppButton>
               </DefaultView>

               {/* play/stop button */}
               <DefaultView
                  style={{
                     width: mainButtonWidth,
                     height: mainButtonHeight,
                  }}>
                  <AppButton
                     flexGrow={1}
                     textStyle={styles.videoActionButtonText}
                     color={
                        recording
                           ? appRedError
                           : alertColorOf(alertType, colorScheme)
                     }
                     height={mainButtonHeight}
                     offset={[1.3, 2.0]}
                     startColor={"#00000077"}
                     borderRadius={1000}
                     onPress={() => {
                        Haptics.selectionAsync();
                        if (recording) {
                           stopRecording();
                        } else {
                           startRecording();
                        }
                     }}>
                     {recording ? (
                        <StopIcon />
                     ) : (
                        <PlayIcon style={{ marginLeft: 3 }} color={white} />
                     )}
                  </AppButton>
               </DefaultView>

               {/* flip camera button */}
               <DefaultView
                  style={{
                     width: secondaryButtonWidth,
                     height: secondaryButtonHeight,
                  }}>
                  <AppButton
                     flexGrow={1}
                     textStyle={styles.videoActionButtonText}
                     color={
                        cameraType == CameraType.back
                           ? Colors[colorScheme].checkedAlert
                           : alertColorOf(alertType, colorScheme)
                     }
                     height={secondaryButtonHeight}
                     startColor={"#00000077"}
                     offset={[1.3, 2.0]}
                     borderRadius={1000}
                     onPress={() => toggleCameraType()}
                     disabled={recording}>
                     <FlipCameraIcon color={white} size={30} />
                  </AppButton>
               </DefaultView>
            </DefaultView>
         </DefaultView>
      );
   }
);

RecordAlertVideo.displayName = "RecordAlertVideo";
