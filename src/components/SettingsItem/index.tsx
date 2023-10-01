import React, { memo } from "react";
import { useSettingsItem } from "./index.hooks";
import { AppButton } from "components/AppButton";
import Colors from "constants/Colors";

type SettingsItemProps = {
   title?: string;
   children?: any;
   onPress?: () => void;
};

export const SettingsItem = memo(
   ({ title, children, onPress }: SettingsItemProps) => {
      const { styles, colorScheme } = useSettingsItem();

      return (
         <AppButton
            inactive={!onPress}
            color={Colors[colorScheme].checkedAlert}
            marginHorizontal={styles.button.marginHorizontal}
            marginVertical={styles.button.marginVertical}
            paddingHorizontal={styles.button.paddingHorizontal}
            paddingVertical={0}
            textStyle={styles.text}
            title={title}
            borderRadius={10}
            distance={3}
            offset={[1.3, 2.0]}
            onPress={onPress}>
            {children}
         </AppButton>
      );
   }
);

SettingsItem.displayName = "SettingsItem";
