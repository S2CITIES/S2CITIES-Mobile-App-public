import React, { memo } from "react";
import {
   Linking,
   ScrollView,
   TouchableOpacity,
   View as DefaultView,
} from "react-native";
import { useAlertDetail } from "./index.hooks";
import { AlertActionButton, AlertVideo, Text, View } from "components";
import { AlertsStackScreenProps } from "../../../types";
import { AlertAction } from "models";
import Colors from "constants/Colors";
import { alertColorOf } from "utils";
import Strings from "constants/Strings";
import LocationIcon from "components/svg/LocationIcon";

type AlertDetailProps = {} & AlertsStackScreenProps<"AlertDetail">;

export const AlertDetail = memo(({ navigation, route }: AlertDetailProps) => {
   const alertBasicInfo = route.params;

   const {
      styles,
      alert,
      alertVideoUrl,
      colorScheme,
      safeAreaFrame,
      lastTappedAction,
      setLastTappedAction,
      assignableUsers,
   } = useAlertDetail({
      navigation,
      alertBasicInfo,
   });

   const alertActions = AlertAction.all();
   const alertButtonWidth = safeAreaFrame.width / alertActions.length - 1;

   return (
      <ScrollView contentContainerStyle={{ flex: 1 }}>
         <View
            style={{
               display: "flex",
               flex: 1,
               flexDirection: "column",
               justifyContent: "flex-start",
               alignItems: "stretch",
            }}>
            {/* content below */}

            <AlertVideo
               videoUri={alertVideoUrl}
               alertType={alertBasicInfo.type}
            />

            {/* alert actions buttons row */}
            <View
               style={[
                  styles.alertActionsRow,
                  {
                     borderColor: Colors[colorScheme].alertActionRowBorderColor,
                  },
               ]}>
               {alertActions.map(action => (
                  <AlertActionButton
                     key={action.type}
                     action={action}
                     width={alertButtonWidth}
                     colorScheme={colorScheme}
                     state={action.buttonState(alert)}
                     alertColor={alertColorOf(alertBasicInfo.type, colorScheme)}
                     alertId={alertBasicInfo.id}
                     assignableUsers={assignableUsers}
                     lastTappedAction={lastTappedAction}
                     setLastTappedAction={setLastTappedAction}
                  />
               ))}
            </View>

            <DefaultView style={{ margin: 5 }}>
               {/* alert info */}
               <DefaultView style={styles.alertInfoBox}>
                  <Text style={styles.alertInfoTitle}>
                     {Strings.en.alert_details_alert_info}
                  </Text>
                  <Text style={styles.alertInfoDescription}>
                     {alert?.info ?? ""}
                  </Text>
                  {alert?.latitude && alert?.longitude && (
                     <Text style={styles.alertInfoDescription}>
                        {`Latitude: ${alert.latitude}\nLongitude: ${alert.longitude}`}
                     </Text>
                  )}
               </DefaultView>

               {/* alert address */}
               {(alert?.address || (alert?.latitude && alert?.longitude)) && (
                  <TouchableOpacity
                     activeOpacity={0.6}
                     onPress={() => {
                        const coordinates =
                           alert?.latitude && alert?.longitude
                              ? `${alert.latitude}%2C${alert.longitude}`
                              : null;

                        console.log(coordinates);

                        const formattedAddress = (alert?.address ?? "")
                           .replaceAll(" ", "%20")
                           .replaceAll(",", "%2C");

                        const queryString = coordinates ?? formattedAddress;

                        // const oldUrl = `https://maps.google.com/maps?daddr=${queryString}`;
                        const url = `https://www.google.com/maps/search/?api=1&query=${queryString}`;

                        Linking.openURL(url);
                        console.log(url);
                     }}>
                     <DefaultView style={styles.alertAddressRow}>
                        <LocationIcon
                           color={Colors[colorScheme].alertDetailAddressColor}
                        />

                        <Text
                           style={[
                              styles.alertAddressText,
                              {
                                 color: Colors[colorScheme]
                                    .alertDetailAddressColor,
                              },
                           ]}>
                           {[
                              alert?.address ?? "",
                              !alert?.address &&
                              alert?.latitude &&
                              alert?.longitude
                                 ? `(${alert.latitude},${alert.longitude})`
                                 : "",
                           ]
                              .filter(x => !!x)
                              .join(" - ")}
                        </Text>
                     </DefaultView>
                  </TouchableOpacity>
               )}
            </DefaultView>
         </View>
      </ScrollView>
   );
});

AlertDetail.displayName = "AlertDetail";
