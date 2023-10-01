import React, { memo } from "react";
import { useSmallAlertCard } from "./index.hooks";
import { Alert } from "models";
import { AppButton } from "components/AppButton";
import { Text, View } from "components/Themed";
import { Text as DefaultText } from "react-native";
import Colors, { appClear } from "constants/Colors";
import Dimensions from "constants/Dimensions";
import { checkableAlertColorOf, alertLabelOfType } from "utils";

type SmallAlertCardProps = {
   alert: Alert;
   goToAlertDetail?: () => void;
   flat?: boolean;
   borderRadiusBottom?: number;
};

export const SmallAlertCard = memo(
   ({
      alert,
      goToAlertDetail,
      flat,
      borderRadiusBottom,
   }: SmallAlertCardProps) => {
      const { styles, colorScheme } = useSmallAlertCard();

      const { type, cam } = alert;

      const shortAddress = alert.getShortAddress();
      const localTime = alert.getLocalTime();
      const alertColor = checkableAlertColorOf(alert, colorScheme);

      return (
         <AppButton
            inactive={!goToAlertDetail}
            onPress={goToAlertDetail}
            marginHorizontal={
               flat ? 0 : Dimensions.smallAlertCard.marginHorizontal
            }
            marginVertical={flat ? 0 : Dimensions.smallAlertCard.marginVertical}
            paddingHorizontal={Dimensions.smallAlertCard.paddingHorizontal}
            paddingVertical={Dimensions.smallAlertCard.paddingVertical}
            color={alertColor}
            startColor={
               flat ? appClear : Colors[colorScheme].buttonDefaultShadowStart
            }
            offset={flat ? [0, 0] : [2.6, 2.7]}
            distance={flat ? 0 : 3}
            borderRadius={
               flat ? 0 : Dimensions.smallAlertCard.defaultAppButtonBorderRadius
            }
            borderRadiusBottom={
               borderRadiusBottom ??
               (flat
                  ? 0
                  : Dimensions.smallAlertCard.defaultAppButtonBorderRadius)
            }>
            <View style={styles.alertCardContentBox}>
               <View style={styles.alertInfoColumn}>
                  <Text
                     style={[
                        styles.alertInfoTitle,
                        { color: Colors[colorScheme].buttonDefaultTextColor },
                     ]}>
                     <DefaultText style={styles.bold}>
                        {alertLabelOfType(type)}
                     </DefaultText>
                     {cam && ` - Cam ${cam}`}
                  </Text>
                  <Text
                     style={[
                        styles.alertInfoAddress,
                        { color: Colors[colorScheme].buttonDefaultTextColor },
                     ]}>
                     {shortAddress}
                  </Text>
               </View>

               <Text
                  style={[
                     styles.timeColumn,
                     { color: Colors[colorScheme].buttonDefaultTextColor },
                  ]}>
                  {localTime}
               </Text>
            </View>
         </AppButton>
      );
   }
);

SmallAlertCard.displayName = "SmallAlertCard";
