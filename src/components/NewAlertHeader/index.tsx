import React, { memo } from "react";
import {
   View as DefaultView,
   Text as DefaultText,
   TouchableOpacity,
} from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { useNewAlertHeader } from "./index.hooks";
import { Text, View } from "components/Themed";
import TopBarIcon, { TopBarPosition } from "components/svg/TopBarIcon";
import Colors, { white } from "constants/Colors";
import { alertColorOf as alertColorOf, alertLabelOfType } from "utils";
import { AlertType } from "models";
import { actions } from "redux-store";
import Strings from "constants/Strings";

type NewAlertHeaderProps = {
   navigation: NavigationProp<any>;
   type: AlertType;
   alertWhenGoBack?: boolean;
};

export const NewAlertHeader = memo(
   ({ navigation, type, alertWhenGoBack }: NewAlertHeaderProps) => {
      const { styles, colorScheme, insets, dispatch } = useNewAlertHeader();
      const alertColor = alertColorOf(type, colorScheme);

      return (
         <DefaultView
            style={[
               styles.headerWrapper,
               {
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
                  onPress={() => {
                     if (alertWhenGoBack) {
                        dispatch(
                           actions.openModal({
                              title: Strings.en.add_alert_go_back_alert_message,
                              confirmLabel: Strings.en.exit,
                              rejectLabel: Strings.en.stay,
                              confirmCallback: () => navigation.goBack(),
                              rejectCallback: () => {},
                           })
                        );
                     } else {
                        navigation.goBack();
                     }
                  }}
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
                     {`New ${alertLabelOfType(type)}`}
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
                     {""}
                  </Text>
               </View>
            </DefaultView>
         </DefaultView>
      );
   }
);

NewAlertHeader.displayName = "NewAlertHeader";
