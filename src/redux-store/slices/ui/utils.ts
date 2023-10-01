import { ColorSchemeName, StyleSheet } from "react-native";

import Toast, { ToastOptions } from "react-native-root-toast";
import { ToastDuration, ToastType } from "./ui.interfaces";

import Dimensions from "constants/Dimensions";
import Colors from "constants/Colors";

export function showToast(
   type: ToastType,
   message: string,
   duration: ToastDuration,
   colorScheme: ColorSchemeName,
   options?: ToastOptions
): Toast {
   const {
      marginTop,
      longDurationInMs,
      mediumDurationInMs,
      shortDurationInMs,
   } = Dimensions.mainToast;
   const themedColors = Colors[colorScheme];

   let popUpBackground: string;
   let popUpTextColor: string;

   let msDuration;
   switch (duration) {
      case ToastDuration.Short:
         msDuration = shortDurationInMs;
         break;
      case ToastDuration.Medium:
         msDuration = mediumDurationInMs;
         break;
      case ToastDuration.Long:
         msDuration = longDurationInMs;
         break;
   }

   switch (type) {
      case ToastType.Error:
         popUpBackground = themedColors.errorPopUpBackground;
         popUpTextColor = themedColors.errorPopUpTextColor;
         break;

      case ToastType.Warning:
         popUpBackground = themedColors.warningPopUpBackground;
         popUpTextColor = themedColors.warningPopUpTextColor;
         break;

      case ToastType.Success:
         popUpBackground = themedColors.successPopUpBackground;
         popUpTextColor = themedColors.successPopUpTextColor;
         break;

      case ToastType.Info:
         popUpBackground = themedColors.infoPopUpBackground;
         popUpTextColor = themedColors.infoPopUpTextColor;
         break;
   }

   const styles = StyleSheet.create({
      popUpText: {
         fontFamily: "lato-black",
         fontSize: 15.5,
         marginHorizontal: 8,
         paddingTop: 0,
         marginBottom: 3.5,
         lineHeight: 25,
         maxWidth: 200,
         textAlign: "center",
      },
   });

   return Toast.show(`${message}  ${type.valueOf()}`, {
      position:
         marginTop +
         (type === ToastType.Info || type === ToastType.Warning ? 60 : 0),
      duration: msDuration,
      backgroundColor: popUpBackground,
      textColor: popUpTextColor,
      textStyle: styles.popUpText,
      animation: true,
      opacity: 1.0,
      ...options,
   });
}
