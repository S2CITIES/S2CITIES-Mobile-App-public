import React, { PropsWithChildren, memo } from "react";
import {
   ColorValue,
   FlexStyle,
   TextStyle,
   TouchableOpacity,
   View as DefaultView,
} from "react-native";
import { Shadow, ShadowProps } from "react-native-shadow-2";

import Colors from "constants/Colors";
import { Text } from "components/Themed";
import { useAppButton } from "./index.hooks";
import Dimensions from "constants/Dimensions";

type AppButtonProps = PropsWithChildren<{
   onPress?: () => void;
   title?: string;
   paddingVertical?: FlexStyle["paddingVertical"];
   paddingHorizontal?: FlexStyle["paddingHorizontal"];
   margin?: FlexStyle["margin"];
   marginVertical?: FlexStyle["marginVertical"];
   marginHorizontal?: FlexStyle["marginHorizontal"];
   flexGrow?: FlexStyle["flexGrow"];
   color?: ColorValue;
   textStyle?: TextStyle;
   offset?: ShadowProps["offset"];
   distance?: ShadowProps["distance"];
   disabled?: boolean;
   inactive?: boolean;
   startColor?: string;
   borderRadius?: number;
   borderRadiusBottom?: number;
   direction?: "row" | "column";
   height?: number;
}>;

export const AppButton = memo(
   ({
      children,
      onPress,
      title,
      paddingVertical,
      paddingHorizontal,
      margin,
      marginVertical,
      marginHorizontal,
      flexGrow,
      color,
      textStyle,
      offset,
      distance,
      disabled,
      inactive,
      startColor,
      borderRadius,
      borderRadiusBottom,
      direction,
      height,
   }: AppButtonProps) => {
      const { styles, colorScheme } = useAppButton();

      const buttonBoxStyles = [
         styles.appButtonContainer,
         {
            backgroundColor: Colors[colorScheme].buttonDefaultColor,
         },
         !!paddingHorizontal && { paddingHorizontal },
         !!paddingVertical && { paddingVertical },
         !!color && { backgroundColor: color },
         (!!borderRadius || borderRadius === 0) && {
            borderRadius: borderRadius,
         },
         (!!borderRadiusBottom || borderRadiusBottom === 0) && {
            borderBottomLeftRadius: borderRadiusBottom,
            borderBottomRightRadius: borderRadiusBottom,
         },
         !!direction && { flexDirection: direction },
         !!height && { height: height },
      ];

      const buttonBoxContent = (
         <>
            {!!title && (
               <Text
                  style={[
                     styles.appButtonText,
                     {
                        color: Colors[colorScheme].buttonDefaultTextColor,
                     },
                     !!textStyle && textStyle,
                  ]}>
                  {title}
               </Text>
            )}

            {!!children && children}
         </>
      );

      return (
         <Shadow
            containerStyle={[
               { margin: Dimensions.smallAlertCard.defaultAppButtonMargin },
               (!!margin || margin === 0) && { margin },
               (!!marginVertical || marginVertical === 0) && { marginVertical },
               (!!marginHorizontal || marginHorizontal === 0) && {
                  marginHorizontal,
               },
               (!!flexGrow || flexGrow === 0) && { flexGrow },
               !!disabled && { opacity: 0.5 },
               !!height && { height: height },
            ]}
            offset={offset ?? [1, 0.9]}
            distance={distance ?? 2}
            startColor={
               startColor ?? Colors[colorScheme].buttonDefaultShadowStart
            }
            stretch={true}>
            {inactive || disabled ? (
               <DefaultView style={buttonBoxStyles}>
                  {buttonBoxContent}
               </DefaultView>
            ) : (
               <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                     if (onPress) {
                        onPress();
                     }
                  }}
                  style={buttonBoxStyles}>
                  {buttonBoxContent}
               </TouchableOpacity>
            )}
         </Shadow>
      );
   }
);

AppButton.displayName = "AppButton";
