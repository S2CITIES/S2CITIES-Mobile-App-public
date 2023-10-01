import { StyleSheet } from "react-native";

type SpinnerStylesProps = {
   spinner;
};

export const styles: SpinnerStyles = StyleSheet.create({
   spinner: {
      margin: 25,
   },
});

export type SpinnerStyles = StyleSheet.NamedStyles<SpinnerStylesProps>;
