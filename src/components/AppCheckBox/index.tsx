import React, { memo } from "react";
import { View as DefaultView } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import * as Haptics from "expo-haptics";
import { appClear } from "constants/Colors";
import { Spinner } from "components/Spinner";
import AlertActionIcon from "components/svg/AlertActionIcon";
import Colors from "constants/Colors";
import Dimensions from "constants/Dimensions";
import { useAppTheme } from "utils/ui";

type AppCheckBoxProps = {
   isChecked: boolean;
   onPress: (checked: boolean) => void;
   color?: string;
   isActionLoading?: boolean;
   size?: number;
   borderWidth?: number;
   borderRadius?: number;
   offsetEnd?: number;
   padding?: number;
};

export const AppCheckBox = memo(
   ({
      isChecked,
      onPress,
      color,
      isActionLoading,
      size,
      borderWidth,
      borderRadius,
      offsetEnd,
      padding,
   }: AppCheckBoxProps) => {
      const colorScheme = useAppTheme();
      color = color ?? Colors[colorScheme].defaultCheckbox;
      size = size ?? Dimensions.taskBox.checkboxDefaultSize;
      borderWidth = borderWidth ?? 3;
      borderRadius = borderRadius ?? 5;
      offsetEnd = offsetEnd ?? 0;
      padding = padding ?? 0;
      return (
         <DefaultView style={{ marginEnd: offsetEnd }}>
            <BouncyCheckbox
               isChecked={isChecked}
               onPress={checked => {
                  onPress(checked);
                  Haptics.selectionAsync();
               }}
               innerIconStyle={{
                  borderRadius: borderRadius,
                  borderWidth: borderWidth,
               }}
               iconStyle={{
                  borderRadius: borderRadius,
                  backgroundColor: appClear,
               }}
               size={size}
               fillColor={isActionLoading ? appClear : color}
               style={{ padding: padding }}
               iconComponent={
                  isActionLoading ? (
                     <Spinner />
                  ) : isChecked ? (
                     <AlertActionIcon
                        icon='check'
                        width={size / 2.0}
                        height={size / 2.0}
                        color={color}
                     />
                  ) : (
                     <></>
                  )
               }
            />
         </DefaultView>
      );
   }
);

AppCheckBox.displayName = "AppCheckBox";
