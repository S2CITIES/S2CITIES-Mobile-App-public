import React, { memo } from "react";
import { View as DefaultView, StyleProp, ViewStyle } from "react-native";
import { useLineSeparator } from "./index.hooks";
import { Text } from "components/Themed";
import Colors from "constants/Colors";

type LineSeparatorProps = {
   label: string;
   style?: StyleProp<ViewStyle>;
};

export const LineSeparator = memo(({ label, style }: LineSeparatorProps) => {
   const { styles, colorScheme } = useLineSeparator();

   return (
      <DefaultView style={[styles.separatorBox, style]}>
         <Text
            style={[
               styles.separatorLabel,
               { color: Colors[colorScheme].lineSeparator },
            ]}>
            {label}
         </Text>

         <DefaultView
            style={[
               styles.separatorLine,
               { backgroundColor: Colors[colorScheme].lineSeparator },
            ]}
         />
      </DefaultView>
   );
});

LineSeparator.displayName = "LineSeparator";
