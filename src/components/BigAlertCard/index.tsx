import React, { memo } from "react";
import { AlertVideo } from "components/AlertVideo";
import { SmallAlertCard } from "components/SmallAlertCard";
import { useBigAlertCard } from "./index.hooks";
import { TouchableOpacity, View as DefaultView } from "react-native";
import { Alert } from "models";
import Dimensions from "constants/Dimensions";
import { Shadow } from "react-native-shadow-2";
import Colors from "constants/Colors";

type BigAlertCardProps = {
   alert: Alert;
   goToAlertDetail: () => void;
};

export const BigAlertCard = memo(
   ({ alert, goToAlertDetail }: BigAlertCardProps) => {
      const { styles, colorScheme, safeAreaFrame, alertVideoUrl } =
         useBigAlertCard(alert._id);

      return alertVideoUrl === "none" ? (
         <SmallAlertCard alert={alert} goToAlertDetail={goToAlertDetail} />
      ) : (
         <Shadow
            containerStyle={[styles.bigCard]}
            style={{
               borderRadius: Dimensions.dashboard.bigAlertCardBorderRadius,
            }}
            distance={5}
            offset={[1.5, 2.0]}
            startColor={Colors[colorScheme].buttonDefaultShadowStart}
            stretch={true}>
            <TouchableOpacity
               activeOpacity={0.6}
               onPress={() => goToAlertDetail()}>
               <AlertVideo
                  alertType={alert.type}
                  videoUri={alertVideoUrl}
                  width={
                     safeAreaFrame.width -
                     2 * Dimensions.smallAlertCard.marginHorizontal
                  }
                  inactive
                  borderRadiusTop={
                     Dimensions.dashboard.bigAlertCardBorderRadius
                  }
               />

               <SmallAlertCard
                  alert={alert}
                  flat
                  borderRadiusBottom={
                     Dimensions.dashboard.bigAlertCardBorderRadius
                  }
               />
            </TouchableOpacity>
         </Shadow>
      );
   }
);

BigAlertCard.displayName = "BigAlertCard";
