import React, { memo, useRef } from "react";
import { View as DefaultView, TouchableOpacity, Animated } from "react-native";
import { Spinner, Text, View } from "../../components";
import { useEmergency } from "./index.hooks";
import { RootTabScreenProps } from "../../../types";
import Strings from "constants/Strings";
import * as Haptics from "expo-haptics";
import * as Progress from "react-native-progress";
import Dimensions from "constants/Dimensions";
import { appPrimaryBlue } from "constants/Colors";
import { actions } from "redux-store";

type EmergencyProps = {} & RootTabScreenProps<"Emergency">;

export const Emergency = memo(({}: EmergencyProps) => {
   const {
      styles,
      dispatch,
      window,
      buttonAnimated,
      setButtonAnimated,
      animatedPadding,
      animatedFade,
      isEmergencySent,
      isEmergencyLoading,
      loadingProgress,
      setLoadingProgress,
      locationIsLoading,
      callEmergency,
      setCallEmergency,
   } = useEmergency();

   const buttonSize = (window.width * 2.0) / 3.0;
   const loadingIntervalRef = useRef<NodeJS.Timer>();

   return (
      <View style={styles.mainContainer}>
         {callEmergency ? (
            <Spinner
               style={{
                  top: Dimensions.emergency.titleTopPadding,
                  position: "absolute",
               }}
            />
         ) : (
            <Text style={styles.emergencyTitle}>
               {Strings.en.emergency_title}
            </Text>
         )}

         {/* big button */}
         <Animated.View
            style={[
               styles.emergencyButtonWrapper,
               buttonAnimated && {
                  opacity: animatedFade,
                  padding: 5,
               },
               isEmergencySent && {
                  padding: animatedPadding,
               },
            ]}>
            <TouchableOpacity
               delayLongPress={Dimensions.emergency.buttonPressDurationInMs} // 2 sec
               activeOpacity={1}
               onPressIn={() => {
                  loadingIntervalRef.current = setInterval(() => {
                     setLoadingProgress(progress => progress + 1 / 50);
                  }, Dimensions.emergency.buttonPressDurationInMs / 100);

                  setButtonAnimated(true);
                  Haptics.selectionAsync();
               }}
               onPressOut={() => {
                  setButtonAnimated(false);
                  clearInterval(loadingIntervalRef.current);
                  setLoadingProgress(0);
               }}
               onLongPress={async () => {
                  console.log("long press");
                  Haptics.notificationAsync(
                     Haptics.NotificationFeedbackType.Success
                  );

                  // TODO: * get GPS location and create an emergency alert *

                  if (isEmergencySent) {
                     // emergency has already been called
                     dispatch(
                        actions.openModal({
                           title: Strings.en.emergency_already_called_alert,
                           confirmLabel: "Yes",
                           rejectLabel: "No",
                           rejectCallback: () => {},
                           confirmCallback: async () => {
                              setCallEmergency(true);
                           },
                        })
                     );
                  } else {
                     // first time user call the emergency
                     setCallEmergency(true);
                  }
               }}
               style={[
                  styles.emergencyButton,
                  {
                     width: buttonSize,
                     height: buttonSize,
                  },
               ]}>
               <DefaultView>
                  <Text style={styles.emergencyButtonText}>
                     {Strings.en.emergency_ask_for_help}
                  </Text>
               </DefaultView>
            </TouchableOpacity>
         </Animated.View>

         {/* progress bar */}
         {(buttonAnimated || callEmergency) && (
            <Progress.Bar
               progress={callEmergency ? 1.0 : loadingProgress}
               width={buttonSize}
               style={{ position: "absolute", bottom: 30 }}
               color={appPrimaryBlue}
            />
         )}
      </View>
   );
});

Emergency.displayName = "Emergency";
