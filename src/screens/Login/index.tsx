import React, { memo } from "react";
import {
   Animated,
   View as DefaultView,
   ScrollView,
   TextInput,
   TouchableOpacity,
} from "react-native";
import { useLogin } from "./index.hooks";
import { AppButton, Text, View } from "components";
import Strings from "constants/Strings";
import { RootStackScreenProps } from "../../../types";
import Colors, { appRedError } from "constants/Colors";
import Dimensions from "constants/Dimensions";
import TopBarIcon, { TopBarPosition } from "components/svg/TopBarIcon";
import { useNotificationListenerToNavigateToRoot } from "utils/pushNotifications";

type LoginProps = {} & RootStackScreenProps<"Login">;

export const Login = memo(({ navigation }: LoginProps) => {
   const {
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
   } = useLogin(navigation);

   const fieldsAreEmpty =
      (username?.length ?? 0) === 0 || (password?.length ?? 0) === 0;

   useNotificationListenerToNavigateToRoot(navigation);

   return (
      <ScrollView ref={ref => setScrollViewRef(ref)}>
         <View
            style={{
               height: safeAreaFrame.height,
               width: safeAreaFrame.width,
            }}>
            <DefaultView style={styles.mainContainer}>
               <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => navigation.goBack()}
                  style={styles.backArrowWrapper}>
                  <TopBarIcon
                     icon='backArrow'
                     position={TopBarPosition.left}
                     color={Colors[colorScheme].loginBackArrow}
                     style={styles.backArrow}
                  />
               </TouchableOpacity>

               {/* title */}
               <Text style={[styles.titleText, styles.mainContainerElement]}>
                  {Strings.en.login_welcome_back_title}
               </Text>

               {/* username */}
               <DefaultView style={styles.mainContainerElement}>
                  <Text style={styles.formFieldLabel}>
                     {Strings.en.login_username_label}
                  </Text>
                  <TextInput
                     style={[
                        styles.formFieldInputText,
                        { color: Colors[colorScheme].loginText },
                        loginError && {
                           borderBottomColor: appRedError,
                           color: appRedError,
                        },
                     ]}
                     value={username}
                     onChangeText={newUsername => {
                        setUsername(newUsername);
                        setLoginError(false);
                     }}
                  />
               </DefaultView>

               {/* password */}
               <DefaultView style={styles.mainContainerElement}>
                  <Text style={styles.formFieldLabel}>
                     {Strings.en.login_password_label}
                  </Text>
                  <TextInput
                     style={[
                        styles.formFieldInputText,
                        { color: Colors[colorScheme].loginText },
                        loginError && {
                           borderBottomColor: appRedError,
                           color: appRedError,
                        },
                     ]}
                     secureTextEntry
                     value={password}
                     onChangeText={newPassword => {
                        setPassword(newPassword);
                        setLoginError(false);
                     }}
                  />
               </DefaultView>

               {loginError && (
                  <Text style={[{ color: appRedError }, styles.errorText]}>
                     {Strings.en.login_error_message}
                  </Text>
               )}

               {/* login button */}
               <Animated.View
                  style={[
                     styles.mainContainerElement,
                     styles.buttonWrapper,
                     { paddingBottom: extraPadding },
                  ]}>
                  <AppButton
                     marginVertical={Dimensions.login.buttonExtraMarginVertical}
                     title={Strings.en.cover_sign_in}
                     onPress={() => handleSignIn(username, password)}
                     textStyle={styles.signInButtonText}
                     paddingVertical={19}
                     flexGrow={1}
                     distance={3}
                     offset={[1.3, 2.0]}
                     startColor='#00000066'
                     borderRadius={20}
                     disabled={fieldsAreEmpty || loginError}
                     inactive={fieldsAreEmpty || loginError}
                  />
               </Animated.View>
            </DefaultView>
         </View>
      </ScrollView>
   );
});

Login.displayName = "Login";
