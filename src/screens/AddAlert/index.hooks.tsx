import React, { useEffect, useRef, useState } from "react";
import { NavigationProp } from "@react-navigation/native";
import { styles } from "./styles";
import { useLayoutEffect } from "react";
import { NewAlertHeader } from "components";
import { AlertType } from "models";
import { useAppTheme } from "utils/ui";
import { Animated, Keyboard, useWindowDimensions } from "react-native";
import { handleKeyboard } from "utils/keyboard";
import Dimensions from "constants/Dimensions";
import { useDispatch, useSelector } from "react-redux";
import { actions, selectors } from "redux-store";
import * as Location from "expo-location";
import { ToastDuration, ToastType } from "redux-store/slices/ui/ui.interfaces";
import Strings from "constants/Strings";
import { getLocation } from "utils/systemServices";
import { apiBaseUrl } from "config";
import {
   UploadSignedUrlResponse,
   requestUploadSignedUrl,
   uploadVideo,
} from "utils/api";
import { HttpMethod } from "redux-store/extra-actions/apis/api-builder";
import * as ImagePicker from "expo-image-picker";

type UseAddAlertProps = {
   navigation: NavigationProp<any>;
   alertType: AlertType;
};

export const useAddAlert = ({ navigation, alertType }: UseAddAlertProps) => {
   const colorScheme = useAppTheme();
   const window = useWindowDimensions();
   const dispatch = useDispatch();

   const [alertInfo, setAlertInfo] = useState("");
   const [alertLocation, setAlertLocation] = useState("");
   const [zone, setZone] = useState("Other");

   const extraPadding = useRef(new Animated.Value(0)).current;

   const changePaddingTo = (padding: number) => {
      Animated.timing(extraPadding, {
         toValue: padding,
         duration: 200,
         useNativeDriver: false,
      }).start();
   };

   const zones = useSelector(selectors.getAllZones);
   const [userLocation, setUserLocation] = useState<{
      address?: string;
      latitude?: string;
      longitude?: string;
   }>();

   const [locationIsLoading, setLocationIsLoading] = useState(false);

   const isNewAlertCreated = useSelector(selectors.isNewAlertCreated);

   const [addressInputError, setAddressInputError] = useState(false);
   const [isAlertCreationInProgress, setIsAlertCreationInProgress] =
      useState(false);

   const isGenericAlertCreationApiLoading = useSelector(
      selectors.postAlertsGenericIsLoading()
   );
   const isHandSignalAlertCreationApiLoading = useSelector(
      selectors.postAlertsHandSignalIsLoading()
   );
   const isAlertCreationApiLoading =
      isGenericAlertCreationApiLoading || isHandSignalAlertCreationApiLoading;

   // manage view header
   useLayoutEffect(() => {
      // set and show alert detail header
      navigation.setOptions({
         header: () => (
            <NewAlertHeader
               navigation={navigation}
               type={
                  alertType === null || alertType === undefined
                     ? AlertType.GenericAlert
                     : alertType
               }
               alertWhenGoBack
            />
         ),
         headerShown: true,
      });

      // hide alert tab header
      const parentNavigator = navigation.getParent();
      parentNavigator.setOptions({
         headerShown: false,
      });

      // handle keyboard
      handleKeyboard({
         onShow: () => {
            changePaddingTo(
               (Keyboard.metrics()?.height ?? 0) +
                  Dimensions.addAlert.extraBottomPadding
            );
         },
         onHide: () => {
            changePaddingTo(0);
         },
      });

      return () => {
         // hide alert detail alert when going somewhere else
         navigation.setOptions({
            headerShown: false,
         });

         // and show again alert tab header
         parentNavigator.setOptions({
            headerShown: true,
         });
      };
   }, [navigation, alertType]);

   // manage user location
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
         const location = await getLocation(dispatch);
         setUserLocation(location);
         setAlertLocation(location.address ?? "");
         setLocationIsLoading(false);
      })();
   }, []);

   useEffect(() => {
      if (!isNewAlertCreated) return;

      // alert has just been created: go back to alerts
      navigation.goBack();

      // reset flag
      dispatch(
         actions.setCreated({
            created: false,
         })
      );

      // update alerts list
      dispatch(actions.getAlerts.request({}));
   }, [isNewAlertCreated]);

   const createAlert = (videoUri: string) => {
      if (!alertLocation || alertLocation.length < 2) {
         setAddressInputError(true);
         return;
      }

      if (alertType === AlertType.HandSignalAlert && !videoUri) {
         dispatch(
            actions.setToast({
               tag: "main",
               duration: ToastDuration.Medium,
               message:
                  Strings.en
                     .add_alert_type_hand_signal_alert_no_video_provided_error,
               open: true,
               toastType: ToastType.Warning,
            })
         );
         return;
      }

      dispatch(
         actions.openModal({
            title: Strings.en.add_alert_create_alert_modal_message,
            confirmLabel: Strings.en.yes,
            rejectLabel: Strings.en.no,
            confirmCallback: async () => {
               setIsAlertCreationInProgress(true);
               await internalCreateAlert(videoUri);
               setIsAlertCreationInProgress(false);
            },
            rejectCallback: () => {},
         })
      );
   };

   const handleUploadVideoFromGallery = async () => {
      let galleryResult: ImagePicker.ImagePickerResult;

      try {
         galleryResult = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            allowsMultipleSelection: false,
            mediaTypes: ImagePicker.MediaTypeOptions.Videos,
            quality: 1,
            videoMaxDuration: 15,
         });
      } catch (e) {
         console.log("An error occurred retrieving video from the gallery");
         console.log(e);

         dispatch(
            actions.setErrorToast({
               message: Strings.en.video_upload_from_gallery_error,
            })
         );
         return;
      }

      if (galleryResult.canceled) {
         console.log("An error occurred retrieving video from the gallery");
         console.log("gallery result canceled");

         return;
      }

      const galleryVideoUri = galleryResult.assets[0].uri;

      // * video successfully retrieved from the gallery here *
      console.log(`gallery video url: ${galleryVideoUri}`);

      // save uri
      navigation.setParams({
         videoUri: galleryVideoUri,
      });
   };

   const handleDiscardVideo = () => {
      dispatch(
         actions.openModal({
            title: Strings.en.video_discard_alert_message,
            confirmLabel: Strings.en.yes,
            rejectLabel: Strings.en.no,
            rejectCallback: () => {},
            confirmCallback: () => {
               navigation.setParams({
                  videoUri: undefined,
               });
            },
         })
      );
   };

   async function internalCreateAlert(videoUri: string) {
      if (alertType === null || alertType === undefined) {
         dispatch(
            actions.setErrorToast({
               message: "Error: alert type not set",
            })
         );
         return;
      }

      let requestUploadSignedUrlResponse: UploadSignedUrlResponse = {};

      if (videoUri) {
         const postSignedUrlEndpoint = `${apiBaseUrl()}/alerts/video/s3signedurl`;
         const videoUriElements = videoUri.split(".");
         const videoUriFormat = videoUriElements[videoUriElements.length - 1];

         requestUploadSignedUrlResponse = await requestUploadSignedUrl(
            postSignedUrlEndpoint,
            videoUriFormat
         );

         if (!requestUploadSignedUrlResponse) {
            dispatch(
               actions.setErrorToast({
                  message: "An error occurred uploading the video",
               })
            );
            return;
         }

         // * successfully requested upload signed uri *
         const { upload_signed_url } = requestUploadSignedUrlResponse;

         const uploadVideoResponse = await uploadVideo(
            upload_signed_url,
            HttpMethod.PUT,
            videoUri
         );

         if (!uploadVideoResponse) {
            dispatch(
               actions.setErrorToast({
                  message: "An error occurred uploading the video",
               })
            );
            return;
         }

         /* video successfully uploaded here */
         console.log("* video successfully uploaded *");

         // now take alertId (and other info) and send it in the api call
      }

      const { alert_id, format, key } = requestUploadSignedUrlResponse;
      const zoneObj = zones.find(z => z._id === zone);

      const requestParams = {
         zone_id: zone === "Other" ? null : zone,
         address: alertLocation,
         latitude:
            (zone === "Other" ? userLocation?.latitude : zoneObj?.latitude) ??
            null,
         longitude:
            (zone === "Other" ? userLocation?.longitude : zoneObj?.longitude) ??
            null,
         info: alertInfo ?? null,
         // for video upload
         alert_id,
         format,
         key,
      };

      switch (alertType) {
         case AlertType.GenericAlert:
            dispatch(actions.postAlertsGeneric.request(requestParams));
            break;

         case AlertType.HandSignalAlert:
            dispatch(actions.postAlertsSignalforhelp.request(requestParams));
            break;

         default:
            console.log("Unexpected alert type in alert creation");
      }
   }

   return {
      styles,
      window,
      colorScheme,
      alertInfo,
      setAlertInfo,
      alertLocation,
      setAlertLocation,
      zone,
      setZone,
      extraPadding,
      zones,
      locationIsLoading,
      userLocation,
      createAlert,
      isAlertCreationInProgress,
      isAlertCreationApiLoading,
      addressInputError,
      setAddressInputError,
      handleUploadVideoFromGallery,
      handleDiscardVideo,
   };
};
