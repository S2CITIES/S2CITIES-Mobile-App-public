import { Animated, Keyboard } from "react-native";
import { styles } from "./styles";
import { useSafeAreaFrame } from "react-native-safe-area-context";
import { useEffect, useRef, useState } from "react";
import { handleKeyboard } from "utils/keyboard";
import Dimensions from "constants/Dimensions";
import { NavigationProp } from "@react-navigation/native";
import { useAppTheme } from "utils/ui";

export const useLogin = (navigation: NavigationProp<any>) => {
   const safeAreaFrame = useSafeAreaFrame();
   const colorScheme = useAppTheme();

   // TODO: remove default values and properly handle authentication
   const defaultUsername = "s2cities.asp@gmail.com";
   const defaultPassword = "S2C1T1Es";
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");

   const extraPadding = useRef(new Animated.Value(0)).current;
   const [scrollViewRef, setScrollViewRef] = useState(undefined);

   const [loginError, setLoginError] = useState(false);

   const changePaddingTo = (padding: number) => {
      Animated.timing(extraPadding, {
         toValue: padding,
         duration: 300,
         useNativeDriver: false,
      }).start();
   };

   const handleSignIn = (username: string, password: string) => {
      // TODO: properly check username and password

      // fake check
      if (username === defaultUsername && password === defaultPassword) {
         // success: start app
         navigation.reset({
            index: 0,
            routes: [{ name: "Root" }],
         });
      } else {
         setLoginError(true);
      }
   };

   useEffect(() => {
      handleKeyboard({
         onShow: () => {
            changePaddingTo(
               (Keyboard.metrics()?.height ?? 0) +
                  Dimensions.login.buttonExtraPaddingBottom
            );
            scrollViewRef?.scrollToEnd({ animated: true });
         },
         onHide: () => {
            changePaddingTo(0);
         },
      });
   }, []);

   return {
      styles,
      safeAreaFrame,
      colorScheme,
      username,
      setUsername,
      password,
      setPassword,
      extraPadding,
      setScrollViewRef,
      handleSignIn,
      loginError,
      setLoginError,
   };
};
