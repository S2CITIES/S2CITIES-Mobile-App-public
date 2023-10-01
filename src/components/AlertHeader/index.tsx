import React, { memo } from "react";
import {
   View as DefaultView,
   Text as DefaultText,
   TouchableOpacity,
} from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { useAlertHeader } from "./index.hooks";
import { Text, View } from "components/Themed";
import TopBarIcon, { TopBarPosition } from "components/svg/TopBarIcon";
import Dimensions from "constants/Dimensions";
import Colors, { white } from "constants/Colors";
import { alertColorOf as alertColorOf, alertLabelOfType } from "utils";
import { AlertBasicInfo } from "models";

type AlertHeaderProps = {
   alertBasicInfo: AlertBasicInfo;
   navigation: NavigationProp<any>;
};

export const AlertHeader = memo(
   ({ navigation, alertBasicInfo }: AlertHeaderProps) => {
      const { styles, colorScheme, insets } = useAlertHeader();
      const { type, cam, localTime } = alertBasicInfo;
      let { shortAddress } = alertBasicInfo;
      const alertColor = alertColorOf(type, colorScheme);

      if (shortAddress.length > Dimensions.maxAlertAddressLength)
         shortAddress = `${shortAddress.substring(
            0,
            Dimensions.maxAlertAddressLength
         )}...`;

      return (
         <DefaultView
            style={[
               styles.headerWrapper,
               {
                  // height: Dimensions.topBar.height + insets.top + 16,
                  backgroundColor: Colors[colorScheme].topBarBackground,
                  paddingTop: insets.top + 10,
               },
            ]}>
            <DefaultView
               style={[
                  styles.headerRow,
                  {
                     backgroundColor: alertColor,
                  },
               ]}>
               <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => navigation.goBack()}
                  style={styles.backArrow}>
                  <TopBarIcon
                     icon='backArrow'
                     position={TopBarPosition.left}
                     color={white}
                  />
               </TouchableOpacity>

               <View
                  style={[
                     styles.alertInfoCentralBox,
                     {
                        backgroundColor: `${alertColor}00`, // transparent, but alertColor as base color
                     },
                  ]}>
                  <Text
                     style={[
                        styles.alertTitleLabel,
                        {
                           color: Colors[colorScheme].buttonDefaultTextColor,
                        },
                     ]}>
                     <DefaultText style={styles.alertTypeLabel}>
                        {alertLabelOfType(type)}
                     </DefaultText>
                     {cam && ` - Cam ${cam}`}
                  </Text>
                  <Text
                     style={[
                        styles.alertAddressLabel,
                        {
                           color: Colors[colorScheme].buttonDefaultTextColor,
                        },
                     ]}>
                     {shortAddress}
                  </Text>
               </View>
               <View
                  style={[
                     styles.alertLocalTimeWrapper,
                     {
                        backgroundColor: `${alertColor}00`, // transparent, but alertColor as base color
                     },
                  ]}>
                  <Text
                     style={[
                        styles.alertLocalTimeLabel,
                        {
                           color: Colors[colorScheme].buttonDefaultTextColor,
                        },
                     ]}>
                     {localTime}
                  </Text>
               </View>
            </DefaultView>
         </DefaultView>
      );
   }
);

AlertHeader.displayName = "AlertHeader";
