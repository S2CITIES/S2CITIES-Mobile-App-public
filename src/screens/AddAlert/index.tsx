import React, { memo } from "react";
import {
   View as DefaultView,
   TextInput,
   Animated,
   ScrollView,
   TouchableOpacity,
} from "react-native";
import { useAddAlert } from "./index.hooks";
import { AlertVideo, AppButton, Spinner, Text, View } from "components";
import { AlertsStackScreenProps } from "../../../types";
import Strings from "constants/Strings";
import Colors, { appRedError } from "constants/Colors";
import Dimensions from "constants/Dimensions";
import { alertColorOf, alertNameOfType, alertTypeFromName } from "utils";
import { AlertType } from "models";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon, Select } from "native-base";
import DeleteIcon from "components/svg/DeleteIcon";

type AddAlertProps = {} & AlertsStackScreenProps<"AddAlert">;

export const AddAlert = memo(({ navigation, route }: AddAlertProps) => {
   const { videoUri, type: alertType } = route.params;

   const {
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
   } = useAddAlert({ navigation, alertType });

   return (
      <ScrollView>
         <View style={styles.mainContainer}>
            {/* alert video */}
            <DefaultView
               style={[
                  styles.videoContainer,
                  {
                     width: window.width,
                     height:
                        window.width /
                        Dimensions.alertDetail.videoThumbSizeRatio,
                     paddingHorizontal: videoUri ? 0 : window.width / 5,
                  },
               ]}>
               {/* take video button */}
               {!videoUri && (
                  <AppButton
                     title={Strings.en.add_alert_take_video}
                     marginVertical={8}
                     paddingVertical={18}
                     textStyle={{
                        fontFamily: "lato-black",
                        fontSize: 16,
                     }}
                     color={Colors[colorScheme].background}
                     onPress={() => {
                        navigation.getParent().navigate("RecordAlertVideo", {
                           type:
                              alertType === undefined || alertType === null
                                 ? AlertType.GenericAlert
                                 : alertType,
                        });
                     }}
                  />
               )}
               {/* upload video button */}
               {!videoUri && (
                  <AppButton
                     title={Strings.en.add_alert_upload_video}
                     marginVertical={8}
                     paddingVertical={18}
                     textStyle={{
                        fontFamily: "lato-black",
                        fontSize: 16,
                     }}
                     color={Colors[colorScheme].background}
                     onPress={() => handleUploadVideoFromGallery()}
                  />
               )}

               {/* video player */}
               {videoUri && (
                  <AlertVideo
                     videoUri={videoUri}
                     alertType={AlertType.GenericAlert}
                  />
               )}

               {/* discard video button */}
               {videoUri && (
                  <TouchableOpacity
                     activeOpacity={0.6}
                     onPress={() => handleDiscardVideo()}
                     style={styles.deleteVideoIconWrapper}>
                     <DeleteIcon color={appRedError} size={26} />
                  </TouchableOpacity>
               )}
            </DefaultView>

            {/* alert data */}
            <DefaultView style={styles.alertDataContainer}>
               {/* alert type */}
               <DefaultView style={styles.alertDataContainerElement}>
                  <Text style={styles.formFieldLabel}>
                     {Strings.en.add_alert_type}
                  </Text>
                  <Select
                     selectedValue={alertNameOfType(
                        alertType === null || alertType === undefined
                           ? AlertType.GenericAlert
                           : alertType
                     )}
                     flex={1}
                     display={"flex"}
                     flexDirection={"row"}
                     flexWrap={"nowrap"}
                     alignItems={"center"}
                     borderWidth={0.5}
                     paddingLeft={10}
                     fontFamily={"lato-black"}
                     marginTop={3}
                     fontSize={Dimensions.addAlert.formFieldInputTextSize}
                     color={Colors[colorScheme].text}
                     dropdownIcon={
                        <ChevronDownIcon
                           size={5}
                           position='absolute'
                           style={{ marginStart: 10 }}
                        />
                     }
                     dropdownOpenIcon={
                        <ChevronUpIcon
                           size={5}
                           position='absolute'
                           style={{ marginStart: 10 }}
                        />
                     }
                     _selectedItem={{
                        startIcon: <CheckIcon size={6} />,
                     }}
                     onValueChange={itemValue => {
                        const newAlertType = alertTypeFromName(itemValue);
                        navigation.setParams({
                           type: newAlertType,
                        });
                     }}>
                     <Select.Item
                        label={Strings.en.alert_type_generic_alert}
                        value={"GenericAlert"}
                     />
                     <Select.Item
                        label={`${Strings.en.alert_type_hand_signal_alert}*`}
                        value={"HandSignalAlert"}
                     />
                  </Select>
                  {alertType === AlertType.HandSignalAlert && (
                     <Text style={styles.videoRequiredText}>
                        *{Strings.en.video_required}
                     </Text>
                  )}
               </DefaultView>

               {/* zone */}
               <DefaultView style={styles.alertDataContainerElement}>
                  <Text style={styles.formFieldLabel}>
                     {Strings.en.add_alert_zone}
                  </Text>
                  {locationIsLoading ? (
                     <DefaultView style={styles.locationLoadingWrapper}>
                        <Text style={styles.locationLoadingText}>
                           {Strings.en.retrieving_location_loading}
                        </Text>
                        <Spinner margin={{ top: 0, bottom: 0 }} />
                     </DefaultView>
                  ) : (
                     <Select
                        selectedValue={zone}
                        flex={1}
                        display={"flex"}
                        flexDirection={"row"}
                        flexWrap={"nowrap"}
                        alignItems={"center"}
                        borderWidth={0.5}
                        paddingLeft={10}
                        fontFamily={"lato-black"}
                        marginTop={3}
                        fontSize={Dimensions.addAlert.formFieldInputTextSize}
                        color={Colors[colorScheme].text}
                        dropdownIcon={
                           <ChevronDownIcon
                              size={5}
                              position='absolute'
                              style={{ marginStart: 10 }}
                           />
                        }
                        dropdownOpenIcon={
                           <ChevronUpIcon
                              size={5}
                              position='absolute'
                              style={{ marginStart: 10 }}
                           />
                        }
                        _selectedItem={{
                           startIcon: <CheckIcon size={6} />,
                        }}
                        onValueChange={itemValue => {
                           setZone(itemValue);

                           if (itemValue === "Other") {
                              setAlertLocation(userLocation.address);
                           } else {
                              const zone = zones.find(
                                 zone => zone._id === itemValue
                              );
                              setAlertLocation(zone?.address ?? "");
                           }
                        }}>
                        <Select.Item
                           label={Strings.en.add_alert_zone_other}
                           value='Other'
                        />
                        {zones.map(zone => (
                           <Select.Item
                              key={zone._id}
                              label={zone.name}
                              value={zone._id ?? "Other"}
                           />
                        ))}
                     </Select>
                  )}
               </DefaultView>

               {/* location */}
               <DefaultView style={styles.alertDataContainerElement}>
                  <Text style={styles.formFieldLabel}>
                     {Strings.en.add_alert_location}
                  </Text>
                  {addressInputError && (
                     <Text style={[{ color: appRedError }, styles.errorText]}>
                        {Strings.en.add_alert_address_input_error_message}
                     </Text>
                  )}
                  {locationIsLoading ? (
                     <DefaultView style={styles.locationLoadingWrapper}>
                        <Text style={styles.locationLoadingText}>
                           {Strings.en.retrieving_location_loading}
                        </Text>
                        <Spinner margin={{ top: 0, bottom: 0 }} />
                     </DefaultView>
                  ) : (
                     <TextInput
                        style={[
                           styles.formFieldInputText,
                           styles.locationInputText,
                           { color: Colors[colorScheme].loginText },
                           addressInputError && {
                              borderColor: appRedError,
                              color: appRedError,
                           },
                        ]}
                        value={alertLocation}
                        onChangeText={newAlertLocation => {
                           setAlertLocation(newAlertLocation);
                           setAddressInputError(false);
                        }}
                        multiline
                        placeholder={Strings.en.add_alert_location_placeholder}
                        placeholderTextColor={`${Colors[colorScheme].loginText}77`}
                     />
                  )}
               </DefaultView>

               {/* alert info */}
               <DefaultView style={styles.alertDataContainerElement}>
                  <Text style={styles.formFieldLabel}>
                     {Strings.en.add_alert_alert_info}
                  </Text>
                  <TextInput
                     style={[
                        styles.formFieldInputText,
                        styles.alertInfoInputText,
                        { color: Colors[colorScheme].loginText },
                     ]}
                     value={alertInfo}
                     onChangeText={newAlertInfo => {
                        setAlertInfo(newAlertInfo);
                     }}
                     multiline
                     placeholder={Strings.en.add_alert_alert_info_placeholder}
                     placeholderTextColor={`${Colors[colorScheme].loginText}77`}
                  />
               </DefaultView>

               {/* Confirm button */}
               <Animated.View
                  style={[
                     styles.createAlertButtonWrapper,
                     {
                        paddingBottom: extraPadding,
                        marginBottom: 100,
                     },
                  ]}>
                  {isAlertCreationInProgress || isAlertCreationApiLoading ? (
                     <Spinner />
                  ) : (
                     <AppButton
                        title={Strings.en.add_alert_create_alert}
                        paddingVertical={
                           Dimensions.addAlert.createAlertButtonPaddingVertical
                        }
                        color={alertColorOf(alertType, colorScheme)}
                        textStyle={styles.createAlertButtonText}
                        onPress={() => createAlert(videoUri)}
                     />
                  )}
               </Animated.View>
            </DefaultView>
         </View>
      </ScrollView>
   );
});

AddAlert.displayName = "AddAlert";
