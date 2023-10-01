import React, { PropsWithChildren, memo } from "react";
import { View as DefaultView } from "react-native";
import { useViewHeader } from "./index.hooks";
import Colors from "constants/Colors";
import { Shadow } from "react-native-shadow-2";

type ViewHeaderProps = PropsWithChildren<{
   style: React.ComponentProps<typeof DefaultView>["style"];
}>;

export const MainActionBar = memo(({ children, style }: ViewHeaderProps) => {
   const { styles, colorScheme } = useViewHeader();

   return (
      <Shadow
         offset={[0, 3]}
         distance={2}
         startColor={Colors[colorScheme].mainHeaderShadow}
         stretch={true}>
         <DefaultView
            style={[
               styles.header,
               { backgroundColor: Colors[colorScheme].mainHeaderBackground },
               style,
            ]}>
            {children}
         </DefaultView>
      </Shadow>
   );
});

MainActionBar.displayName = "MainActionBar";
