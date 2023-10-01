import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";

import { RootSiblingParent } from "react-native-root-siblings";

import useCachedResources from "hooks/useCachedResources";
import useColorScheme from "hooks/useColorScheme";
import Navigation from "navigation";

import store from "redux-store";
import { useFonts } from "expo-font";

import { NativeBaseProvider } from "native-base";
import { AppModal, AssignAlertModal } from "components";
import { Assets } from "utils/resources";

export default function App() {
   const isLoadingComplete = useCachedResources();
   const colorScheme = useColorScheme();

   const [loaded] = useFonts({
      "lato-black": require("./assets/fonts/lato/Lato-Black.ttf"),
      "lato-bold": require("./assets/fonts/lato/Lato-Bold.ttf"),
      "lato-bold-italic": require("./assets/fonts/lato/Lato-BoldItalic.ttf"),
      "lato-heavy": require("./assets/fonts/lato/Lato-Heavy.ttf"),
      "lato-italic": require("./assets/fonts/lato/Lato-Italic.ttf"),
      "lato-regular": require("./assets/fonts/lato/Lato-Regular.ttf"),
      "lato-hairline": require("./assets/fonts/lato/Lato-Hairline.ttf"),
      "lato-light": require("./assets/fonts/lato/Lato-Light.ttf"),
      "inter-regular": require("./assets/fonts/inter/Inter-Regular.ttf"),
      "inter-medium": require("./assets/fonts/inter/Inter-Medium.ttf"),
      "inter-bold": require("./assets/fonts/inter/Inter-Bold.ttf"),
      "inter-semibold": require("./assets/fonts/inter/Inter-SemiBold.ttf"),
   });

   const _ = Assets.images.splash;

   if (!loaded) {
      return null;
   }

   if (!isLoadingComplete) {
      return null;
   } else {
      return (
         <Provider store={store}>
            <RootSiblingParent>
               <NativeBaseProvider>
                  <SafeAreaProvider>
                     <AssignAlertModal />
                     <AppModal />
                     <Navigation colorScheme={colorScheme} />
                     <StatusBar />
                  </SafeAreaProvider>
               </NativeBaseProvider>
            </RootSiblingParent>
         </Provider>
      );
   }
}
