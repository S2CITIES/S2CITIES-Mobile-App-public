import { useSafeAreaFrame } from "react-native-safe-area-context";
import { styles } from "./styles";
import { useEffect, useRef, useState } from "react";
import { Animated } from "react-native";
import Dimensions from "constants/Dimensions";
import { useDispatch, useSelector } from "react-redux";
import { actions, selectors } from "redux-store";
import * as Location from "expo-location";
import { ToastDuration, ToastType } from "redux-store/slices/ui/ui.interfaces";
import Strings from "constants/Strings";
import { getLocation } from "utils/systemServices";

export const useEmergency = () => {
   const window = useSafeAreaFrame();
   const dispatch = useDispatch();

   const [buttonAnimated, setButtonAnimated] = useState(false);
   const [buttonAnimationRef, setButtonAnimationRef] =
      useState<Animated.CompositeAnimation>();

   const animatedPadding = useRef(new Animated.Value(0)).current;
   const animatedFade = useRef(new Animated.Value(1)).current;
   const [loadingProgress, setLoadingProgress] = useState(0);

   const isEmergencySent = useSelector(selectors.isEmergencySent);
   const isEmergencyLoading = useSelector(
      selectors.postAlertsEmergencyIsLoading()
   );

   const [locationIsLoading, setLocationIsLoading] = useState(false);
   const [location, setLocation] = useState<{
      address?: string;
      latitude?: string;
      longitude?: string;
   }>();
   const [callEmergency, setCallEmergency] = useState(false);

   useEffect(() => {
      if (!buttonAnimated && !isEmergencySent) {
         // stop animation
         buttonAnimationRef?.stop();
         return;
      }

      // start loop button animation
      const buttonAnimation = Animated.loop(
         Animated.parallel([
            Animated.timing(animatedPadding, {
               toValue: Dimensions.emergency.buttonWrapperMaxPadding,
               duration: Dimensions.emergency.buttonAnimationDurationInMs,
               useNativeDriver: false,
            }),
            Animated.timing(animatedFade, {
               toValue: Dimensions.emergency.buttonMinOpacity,
               duration: Dimensions.emergency.buttonAnimationDurationInMs,
               useNativeDriver: false,
            }),
         ])
      );

      setButtonAnimationRef(buttonAnimation);

      buttonAnimation.start();

      // (stop animation when unmounting)
      return () => buttonAnimationRef?.stop();
   }, [buttonAnimated, isEmergencySent]);

   useEffect(() => {
      (async () => {
         // check current user's location permissions
         let { status } = await Location.getForegroundPermissionsAsync();

         if (status !== Location.PermissionStatus.GRANTED) {
            // request location permission
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== Location.PermissionStatus.GRANTED) {
               // permission not granted: show error message
               dispatch(
                  actions.setToast({
                     tag: "main",
                     open: true,
                     duration: ToastDuration.Long,
                     message:
                        Strings.en.location_permission_not_granted_message,
                     toastType: ToastType.Error,
                  })
               );
               return;
            }
         }

         // * location permission granted here*

         setLocationIsLoading(true);
         const userLocation = await getLocation(dispatch);
         setLocation(userLocation);
         setLocationIsLoading(false);
      })();
   }, []);

   useEffect(() => {
      if (locationIsLoading || !callEmergency) return;

      // * here (1) location has been loaded and (2) the user requested to call emergency *

      // (if address is 'null', the alert will be sent anyway)

      dispatch(
         actions.postAlertsEmergency.request({
            address: location?.address ?? null,
            latitude: location?.latitude ?? null,
            longitude: location?.longitude ?? null,
         })
      );

      console.log("CALLED EMERGENCY");
      setCallEmergency(false);
   }, [locationIsLoading, callEmergency]);

   return {
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
   };
};
