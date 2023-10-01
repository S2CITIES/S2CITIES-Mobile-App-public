import React, { memo } from "react";
import { ActivityIndicator, StyleProp, ViewStyle } from "react-native";
import { useSpinner } from "./index.hooks";
import Colors from "constants/Colors";

type SpinnerProps = {
   margin?: {
      top: number;
      bottom: number;
   };
   size?: number | "small" | "large";
   style?: StyleProp<ViewStyle>;
};

export const Spinner = memo(({ margin, size, style }: SpinnerProps) => {
   const { styles, colorScheme } = useSpinner();

   return (
      <ActivityIndicator
         size={size ?? "large"}
         color={Colors[colorScheme].spinnerColor}
         style={[
            styles.spinner,
            !!margin && { margin: margin.top, marginBottom: margin.bottom },
            !!style && style,
         ]}
      />
   );
});

Spinner.displayName = "Spinner";
