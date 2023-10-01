import React, { useEffect, useRef, useState } from "react";
import { NavigationProp } from "@react-navigation/native";
import { styles } from "./styles";
import { useLayoutEffect } from "react";
import { NewAlertHeader } from "components";
import { AlertType } from "models";
import {
   useSafeAreaFrame,
   useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useAppTheme } from "utils/ui";
import { Camera, CameraType, FlashMode, VideoCodec } from "expo-camera";
import { useDispatch } from "react-redux";
import { actions } from "redux-store";
import { ToastDuration, ToastType } from "redux-store/slices/ui/ui.interfaces";
import Strings from "constants/Strings";
import { useWindowDimensions } from "react-native";

type UseRecordAlertVideoProps = {
   navigation: NavigationProp<any>;
   alertType: AlertType;
};

export const useRecordAlertVideo = ({
   navigation,
   alertType,
}: UseRecordAlertVideoProps) => {
   const safeAreaFrame = useSafeAreaFrame();
   const window = useWindowDimensions();
   const insets = useSafeAreaInsets();
   const colorScheme = useAppTheme();
   const dispatch = useDispatch();

   const [recording, setRecording] = useState<boolean>();

   const cameraRef = useRef<Camera>();
   const setCameraRef = ref => {
      cameraRef.current = ref;
   };

   let [videoPermission, requestVideoPermission] =
      Camera.useCameraPermissions();
   let [audioPermission, requestAudioPermission] =
      Camera.useMicrophonePermissions();

   const [cameraType, setCameraType] = useState(CameraType.back);

   const toggleCameraType = () => {
      setCameraType(type =>
         type === CameraType.back ? CameraType.front : CameraType.back
      );

      setFlashMode(mode => (mode === FlashMode.torch ? FlashMode.off : mode));
   };

   const [flashMode, setFlashMode] = useState(FlashMode.off);

   const toggleFlashMode = () => {
      setFlashMode(mode =>
         mode === FlashMode.off ? FlashMode.torch : FlashMode.off
      );
   };

   // manage view header
   useLayoutEffect(() => {
      // set and show alert detail header
      navigation.setOptions({
         header: () => (
            <NewAlertHeader navigation={navigation} type={alertType} />
         ),
         headerShown: true,
      });

      return () => {
         // hide alert detail alert when going somewhere else
         navigation.setOptions({
            headerShown: false,
         });
      };
   }, [navigation]);

   // manage video permissions
   useEffect(() => {
      (async () => {
         if (!videoPermission) {
            videoPermission = await requestVideoPermission();
         }

         if (!videoPermission.granted) {
            dispatch(
               actions.setToast({
                  tag: "main",
                  open: true,
                  toastType: ToastType.Error,
                  message: Strings.en.camera_permission_not_granted_message,
                  duration: ToastDuration.Long,
               })
            );
         }
      })();
   }, []);

   // manage audio permissions
   useEffect(() => {
      (async () => {
         if (!audioPermission) {
            audioPermission = await requestAudioPermission();
         }

         if (!audioPermission.granted) {
            dispatch(
               actions.setToast({
                  tag: "main",
                  open: true,
                  toastType: ToastType.Error,
                  message: Strings.en.audio_permission_not_granted_message,
                  duration: ToastDuration.Long,
               })
            );
         }
      })();
   }, []);

   useEffect(() => {
      if (
         !videoPermission ||
         !videoPermission.granted ||
         !audioPermission ||
         !audioPermission.granted
      )
         return;

      dispatch(
         actions.setToast({
            tag: "main",
            open: true,
            toastType: ToastType.Info,
            message: Strings.en.video_recoding_max_length_message,
            duration: ToastDuration.Medium,
         })
      );
   }, [videoPermission]);

   const startRecording = async () => {
      setRecording(true);

      let videoUri: string;

      try {
         const { uri } = await cameraRef?.current?.recordAsync({
            maxDuration: 15,
         });
         videoUri = uri;
      } catch (error) {
         setRecording(false);
         console.log(error);
         dispatch(
            actions.setErrorToast({
               message:
                  "An error occurred recording the video. Check your video/audio permissions",
            })
         );
         return;
      }

      setRecording(false);

      // pass uri to the previous screen
      navigation.navigate("AddAlert", {
         type: alertType,
         videoUri: videoUri,
      });
   };

   const stopRecording = () => {
      cameraRef?.current?.stopRecording();
   };

   return {
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
   };
};
