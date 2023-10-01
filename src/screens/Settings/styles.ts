import Dimensions from "constants/Dimensions";
import { StyleSheet } from "react-native";

type SettingsStylesProps = {
   mainContainer;
};

export const styles: SettingsStyles = StyleSheet.create({
   mainContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "stretch",
      width: "100%",
      paddingVertical: Dimensions.settings.mainContainerPadding,
   },
});

export type SettingsStyles = StyleSheet.NamedStyles<SettingsStylesProps>;
