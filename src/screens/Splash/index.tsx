import React, { memo, useEffect } from "react";
import { View as DefaultView } from "react-native";
import { useSplash } from "./index.hooks";
import { Image } from "react-native";
import { RootStackScreenProps } from "../../../types";
import { Assets } from "utils/resources";
import Dimensions from "constants/Dimensions";

type SplashProps = {} & RootStackScreenProps<"Splash">;

export const Splash = memo(({ navigation, route }: SplashProps) => {
   const { styles, window } = useSplash();
   const number = route?.params?.number ?? 0;

   let numOfSlides = Dimensions.splash.slidesDurationInMs.length;
   let imageRef = Assets.images.splash[number];
   let slideDuration = Dimensions.splash.slidesDurationInMs[number];

   useEffect(() => {
      setTimeout(() => {
         if (number < numOfSlides - 1) {
            // go to next splash screen slide
            navigation.navigate("Splash", {
               number: number + 1,
            });
         } else {
            // start app
            navigation.reset({
               index: 0,
               routes: [{ name: "Cover" }],
            });
         }
      }, slideDuration);
   }, [number]);

   return (
      <DefaultView>
         <Image
            source={imageRef}
            resizeMode={"cover"}
            style={{
               width: window.width,
               height: window.height,
            }}
         />
      </DefaultView>
   );
});

Splash.displayName = "Splash";
