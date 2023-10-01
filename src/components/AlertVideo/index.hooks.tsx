import { useSafeAreaFrame } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { AlertType } from "models";
import { Audio, ResizeMode } from "expo-av";
import { useAppTheme } from "utils/ui";
import { useWindowDimensions } from "react-native";

type useAlertVideoProps = {
   alertType: AlertType;
};

export const useAlertVideo = ({ alertType }: useAlertVideoProps) => {
   const window = useWindowDimensions();
   const colorScheme = useAppTheme();

   const [showVideo, setShowVideo] = useState(
      alertType === AlertType.HandSignalAlert ||
         alertType === AlertType.GenericAlert
   );
   const [videoIsLoading, setVideoIsLoading] = useState(
      alertType === AlertType.HandSignalAlert ||
         alertType === AlertType.GenericAlert
   );
   const [videoStarted, setVideoStarted] = useState(false);

   const [androidVideoResizeMode, setAndroidVideoResizeMode] = useState(
      ResizeMode.COVER // used to handle Android video crop bug when video is in full screen
   );

   useEffect(() => {
      // to make video's audio working also in silent mode (iOS)
      Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
   }, []);

   return {
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
   };
};
