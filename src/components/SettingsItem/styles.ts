import Dimensions from "constants/Dimensions";
import { StyleSheet } from "react-native";

type SettingsItemStylesProps = {
   button;
   text;
};

export const styles: SettingsItemStyles = StyleSheet.create({
   button: {
      paddingHorizontal: Dimensions.settings.itemPaddingHorizontal,
      paddingVertical: Dimensions.settings.itemPaddingVertical,
      marginVertical: Dimensions.settings.itemMarginVertical,
      marginHorizontal: Dimensions.settings.itemMarginHorizontal,
   },
   text: {
      fontFamily: "lato-black",
      textAlign: "left",
      flex: 1,
      fontSize: Dimensions.settings.itemTextDefaultSize,
      paddingVertical: Dimensions.settings.itemPaddingVertical,
   },
});

export type SettingsItemStyles =
   StyleSheet.NamedStyles<SettingsItemStylesProps>;
