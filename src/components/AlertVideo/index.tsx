import React, { memo } from "react";
import { Platform, TouchableOpacity, View as DefaultView } from "react-native";
import { ResizeMode, Video, VideoFullscreenUpdate } from "expo-av";
import { useAlertVideo } from "./index.hooks";
import Dimensions from "constants/Dimensions";
import Colors from "constants/Colors";
import { AlertType } from "models";
import NoVideoIcon from "components/svg/NoVideoIcon";
import { Spinner } from "components/Spinner";
import PlayIcon from "components/svg/PlayIcon";
import VideoErrorIcon from "components/svg/VideoErrorIcon";
import * as ScreenOrientation from "expo-screen-orientation";

type AlertVideoProps = {
   alertType: AlertType;
   videoUri: string;
   width?: number;
   height?: number;
   inactive?: boolean;
   borderRadiusTop?: number;
};

export const AlertVideo = memo(
   ({
      alertType,
      videoUri,
      width,
      height,
      inactive,
      borderRadiusTop,
   }: AlertVideoProps) => {
      const {
         window,
         colorScheme,
         showVideo,
         setShowVideo,
         videoIsLoading,
         setVideoIsLoading,
         videoStarted,
         setVideoStarted,
         androidVideoResizeMode,
         setAndroidVideoResizeMode,
      } = useAlertVideo({
         alertType,
      });

      let videoWidth = window.width;
      let videoHeight = videoWidth / Dimensions.alertDetail.videoThumbSizeRatio;

      if (width && height) {
         videoWidth = width;
         videoHeight = height;
      } else if (width) {
         videoWidth = width;
         videoHeight = videoWidth / Dimensions.alertDetail.videoThumbSizeRatio;
      } else if (height) {
         videoHeight = height;
         videoWidth = videoHeight * Dimensions.alertDetail.videoThumbSizeRatio;
      }

      return (
         <DefaultView
            style={{
               height: videoHeight,
               width: videoWidth,
               backgroundColor:
                  Colors[colorScheme].videoThumbnailDefaultBackground,
               borderTopLeftRadius: borderRadiusTop ?? 0,
               borderTopRightRadius: borderRadiusTop ?? 0,
            }}>
            {showVideo &&
               videoUri &&
               videoUri !== "none" &&
               videoUri !== "error" && (
                  <Video
                     style={{
                        height: videoHeight,
                        width: videoWidth,
                        borderTopLeftRadius: borderRadiusTop ?? 0,
                        borderTopRightRadius: borderRadiusTop ?? 0,
                     }}
                     source={{
                        uri: videoUri,
                     }}
                     isLooping
                     shouldPlay={videoStarted}
                     useNativeControls={videoStarted}
                     resizeMode={Platform.select({
                        ios: ResizeMode.COVER,
                        android: androidVideoResizeMode,
                     })}
                     onLoad={() => {
                        setVideoIsLoading(false);
                     }}
                     onError={error => {
                        console.log(`ERROR in loading video: ${error}`);
                        setVideoIsLoading(false);
                        setShowVideo(false);
                     }}
                     onFullscreenUpdate={Platform.select({
                        // only on Android required
                        ios: async () => {},
                        android: async ({ fullscreenUpdate }) => {
                           switch (fullscreenUpdate) {
                              case VideoFullscreenUpdate.PLAYER_WILL_PRESENT:
                                 // make screen rotating based on device orientation
                                 await ScreenOrientation.unlockAsync();
                                 // resize video to not make it cropped when in full screen
                                 setAndroidVideoResizeMode(ResizeMode.CONTAIN);
                                 break;
                              case VideoFullscreenUpdate.PLAYER_WILL_DISMISS:
                                 // come back to portrait mode when exiting full screen
                                 await ScreenOrientation.lockAsync(
                                    ScreenOrientation.OrientationLock.PORTRAIT
                                 );
                                 // resize video to 'cover' mode
                                 setAndroidVideoResizeMode(ResizeMode.COVER);
                                 break;
                           }
                        },
                     })}
                  />
               )}
            <DefaultView
               style={{
                  backgroundColor: `${Colors[colorScheme].videoThumbnailDefaultBackground}00`,
                  position: "absolute",
                  height: videoHeight,
                  alignSelf: "center",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
               }}>
               {videoUri === "none" ? (
                  <NoVideoIcon
                     color={Colors[colorScheme].videoThumbnailPlayIconColor}
                  />
               ) : videoUri === "error" ||
                 (!showVideo && videoUri && videoUri !== "none") ? (
                  <VideoErrorIcon
                     color={Colors[colorScheme].videoThumbnailPlayIconColor}
                  />
               ) : (
                  <></>
               )}

               {showVideo &&
                  videoIsLoading &&
                  videoUri !== "none" &&
                  videoUri !== "error" && <Spinner />}
               {showVideo &&
                  !videoIsLoading &&
                  !videoStarted &&
                  (inactive ? (
                     <DefaultView style={{ padding: 40 }}>
                        <PlayIcon
                           color={
                              Colors[colorScheme].videoThumbnailPlayIconColor
                           }
                        />
                     </DefaultView>
                  ) : (
                     <TouchableOpacity
                        activeOpacity={inactive ? 1.0 : 0.6}
                        onPress={() => {
                           if (inactive) return;

                           setVideoStarted(true);
                        }}
                        style={{ padding: 40 }}>
                        <PlayIcon
                           color={
                              Colors[colorScheme].videoThumbnailPlayIconColor
                           }
                        />
                     </TouchableOpacity>
                  ))}
            </DefaultView>
         </DefaultView>
      );
   }
);

AlertVideo.displayName = "AlertVideo";
