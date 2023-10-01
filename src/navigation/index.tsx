import React, { useEffect, useRef, useState } from "react";
import {
   ColorSchemeName,
   StyleSheet,
   View as DefaultView,
   TouchableOpacity,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import LinkingConfiguration from "./LinkingConfiguration";

import {
   AddAlert,
   AlertDetail,
   Alerts,
   AppCover,
   Dashboard,
   Emergency,
   Login,
   ModalScreen,
   NotFoundScreen,
   RecordAlertVideo,
   Settings,
   Splash,
   Tasks,
} from "screens";

import {
   AlertsStackParamList,
   DashboardStackParamList,
   RootStackParamList,
   RootTabParamList,
   SettingsStackParamList,
   TasksStackParamList,
} from "../../types";

import Colors from "constants/Colors";
import Dimensions from "constants/Dimensions";
import { DarkTheme, DefaultTheme } from "constants/NavigationThemes";

import { Text } from "components";
import BottomBarIcon from "components/svg/BottomBarIcon";
import TopBarIcon, { TopBarPosition } from "components/svg/TopBarIcon";
import { StatusBar } from "expo-status-bar";
import { useDispatch, useSelector } from "react-redux";
import { actions, selectors } from "redux-store";
import Toast from "react-native-root-toast";
import { showToast } from "redux-store/slices/ui/utils";
import { useAppTheme } from "utils/ui";
import { registerForPushNotificationsAsync } from "utils/pushNotifications";
import * as Notifications from "expo-notifications";
import { ToastDuration, ToastType } from "redux-store/slices/ui/ui.interfaces";
import { NotificationType, S2citiesPushNotification } from "models";

type NavigationProps = {
   colorScheme: ColorSchemeName;
};

export default function Navigation({ colorScheme }: NavigationProps) {
   const appTheme = useAppTheme();
   const dispatch = useDispatch();

   const sendErrorAlert = (errorMessage: string) => {
      dispatch(actions.setErrorToast({ message: errorMessage }));
   };

   // * Get last tapped push notification, if any *
   const lastTappedPushNotificationResponse =
      Notifications.useLastNotificationResponse();

   // * expo notifications management state *
   const notificationListener = useRef<Notifications.Subscription>();
   const responseListener = useRef<Notifications.Subscription>();

   const setNotification = (notification: Notifications.Notification) => {
      dispatch(
         actions.setNotification({
            notification,
         })
      );
   };

   useEffect(() => {
      if (
         lastTappedPushNotificationResponse &&
         lastTappedPushNotificationResponse.notification &&
         lastTappedPushNotificationResponse.actionIdentifier ===
            Notifications.DEFAULT_ACTION_IDENTIFIER
      ) {
         // a notification have been tapped: save it
         setNotification(lastTappedPushNotificationResponse.notification);
      }
   }, [lastTappedPushNotificationResponse]);

   useEffect(() => {
      // set up app behavior when a push notification is received in foreground
      Notifications.setNotificationHandler({
         handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: false,
            shouldSetBadge: false,
         }),
      });

      // * Register this app to receive push notification and
      //   save the Expo token sending it to the backend *
      registerForPushNotificationsAsync(sendErrorAlert).then(token => {
         if (!token) return;

         // send notification token to the Backend to save it
         dispatch(
            actions.putUsersExpotoken.request({
               token,
            })
         );
      });

      // * React to last tapped push notification, if any *

      // * Register a callback called when app is foreground and a new push notification is received *
      notificationListener.current =
         Notifications.addNotificationReceivedListener(notification => {
            console.log("* New notification with app in foreground *");
            console.log(notification);

            // save new notification
            setNotification(notification);

            // show info toast for new alert
            dispatch(
               actions.setToast({
                  tag: "main",
                  open: true,
                  duration: ToastDuration.Medium,
                  toastType: ToastType.Info,
                  message: notification.request.content.body,
               })
            );
         });

      // * Register a callback called when user taps on the push notification *
      responseListener.current =
         Notifications.addNotificationResponseReceivedListener(response => {
            console.log("* new response coming from a notification *");
            console.log(response);

            // save new notification
            setNotification(response?.notification);
         });

      return () => {
         if (notificationListener.current)
            Notifications.removeNotificationSubscription(
               notificationListener.current
            );
         if (responseListener.current)
            Notifications.removeNotificationSubscription(
               responseListener.current
            );
      };
   }, []);

   return (
      <NavigationContainer
         linking={LinkingConfiguration}
         theme={appTheme === "dark" ? DarkTheme : DefaultTheme}>
         <RootNavigator />
      </NavigationContainer>
   );
}

/**
 * Root stack navigator used for displaying modals on top of all other content.
 */
const RootStack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
   const colorScheme = useAppTheme();
   const insets = useSafeAreaInsets();
   const mainToastState = useSelector(selectors.getToast("main"));
   const [toast, setToast] = useState({});

   const styles = StyleSheet.create({
      header: {
         height: Dimensions.topBar.height + insets.top,
         borderBottomWidth: Dimensions.topBar.borderWidth,
         backgroundColor: Colors[colorScheme].topBarBackground,
      },
      headerTitle: {
         fontSize: Dimensions.topBarTitle.fontSize,
         fontFamily: "lato-black",
      },
   });

   useEffect(() => {
      if (mainToastState.open) {
         let toast = showToast(
            mainToastState.type,
            mainToastState.message,
            mainToastState.duration,
            colorScheme
         );

         setToast(() => toast);
      } else {
         // if there was any toast, hide it
         if (Object.keys(toast).length > 0) {
            Toast.hide(toast);
         }
      }
   }, [mainToastState]);

   const modalOpen = useSelector(selectors.getModal).open;
   const assignAlertModalOpen = useSelector(selectors.getAssignAlertModal).open;

   return (
      <>
         <RootStack.Navigator screenOptions={{ headerShown: false }}>
            <RootStack.Screen name='Splash' component={Splash} />
            <RootStack.Screen name='Cover' component={AppCover} />
            <RootStack.Screen name='Login' component={Login} />
            <RootStack.Screen name='Root' component={BottomTabNavigator} />
            <RootStack.Screen
               name='NotFound'
               component={NotFoundScreen}
               options={{ title: "Oops!" }}
            />
            <RootStack.Group
               screenOptions={{
                  presentation: "modal",
                  headerStyle: styles.header,
                  headerTitleAlign: "center",
                  headerTitle: ({ children }) => (
                     <Text style={styles.headerTitle}>{children}</Text>
                  ),
               }}>
               <RootStack.Screen name='Modal' component={ModalScreen} />
            </RootStack.Group>
            <RootStack.Screen
               name='Settings'
               component={SettingsViewNavigator}
            />
            <RootStack.Screen
               name='RecordAlertVideo'
               component={RecordAlertVideo}
            />
         </RootStack.Navigator>
         {(modalOpen || assignAlertModalOpen) && (
            <DefaultView
               style={{
                  backgroundColor: Colors[colorScheme].modalOverlayBackground,
                  position: "absolute",
                  width: "100%",
                  height: "100%",
               }}
            />
         )}
      </>
   );
}

/**
 * Bottom tab navigator to display tab buttons on the bottom of the display to switch screens
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator(navigation) {
   const colorScheme = useAppTheme();
   const insets = useSafeAreaInsets();

   const styles = StyleSheet.create({
      header: {
         height: Dimensions.topBar.height + insets.top,
         borderBottomWidth: Dimensions.topBar.borderWidth,
         backgroundColor: Colors[colorScheme].topBarBackground,
      },
      headerTitle: {
         fontSize: Dimensions.topBarTitle.fontSize,
         fontFamily: "lato-black",
      },
      bottomBar: {
         height: Dimensions.bottomBar.height + insets.bottom,
         paddingBottom: Dimensions.bottomBar.paddingBottom + insets.bottom - 9,
      },
   });

   return (
      <>
         <BottomTab.Navigator
            screenOptions={({ navigation }) => ({
               tabBarInactiveTintColor: Colors[colorScheme].tabIconDefault,
               tabBarActiveTintColor: Colors[colorScheme].tabIconSelected,
               tabBarStyle: styles.bottomBar,
               tabBarItemStyle: {
                  marginTop: Dimensions.bottomBarItem.marginTop,
               },
               tabBarLabelStyle: {
                  fontFamily: "lato-bold",
               },
               headerStyle: styles.header,
               headerTitleAlign: "center",
               headerTitle: ({ allowFontScaling, children }) => (
                  <Text
                     allowFontScaling={allowFontScaling}
                     style={styles.headerTitle}>
                     {children}
                  </Text>
               ),
               headerRight: () => (
                  <TouchableOpacity
                     onPress={() => navigation.navigate("Settings")}
                     activeOpacity={0.6}
                     style={{
                        paddingLeft: 40,
                        paddingVertical: 10,
                     }}>
                     <TopBarIcon
                        icon='settings'
                        position={TopBarPosition.right}
                     />
                  </TouchableOpacity>
               ),
            })}
            initialRouteName='Dashboard'>
            <BottomTab.Screen
               name='Dashboard'
               component={DashboardViewNavigator}
               options={{
                  title: "Dashboard",
                  tabBarIcon: ({ color }) => (
                     <BottomBarIcon icon='home' color={color} />
                  ),
               }}
            />
            <BottomTab.Screen
               name='Tasks'
               component={TasksViewNavigator}
               options={{
                  title: "Tasks",
                  tabBarIcon: ({ color }) => (
                     <BottomBarIcon icon='task' color={color} />
                  ),
               }}
            />
            <BottomTab.Screen
               name='Alerts'
               component={AlertsViewNavigator}
               options={{
                  title: "Alerts",
                  tabBarIcon: ({ color }) => (
                     <BottomBarIcon icon='bell' color={color} />
                  ),
               }}
            />
            <BottomTab.Screen
               name='Emergency'
               component={Emergency}
               options={{
                  title: "Emergency",
                  tabBarIcon: ({ color }) => (
                     <BottomBarIcon icon='danger' color={color} />
                  ),
               }}
            />
         </BottomTab.Navigator>
         <StatusBar backgroundColor={Colors[colorScheme].topBarBackground} />
      </>
   );
}

const AlertsStack = createNativeStackNavigator<AlertsStackParamList>();

function AlertsViewNavigator() {
   return (
      <AlertsStack.Navigator
         screenOptions={{
            headerShown: false,
         }}>
         <AlertsStack.Screen name='AlertsList' component={Alerts} />
         <AlertsStack.Screen name='AlertDetail' component={AlertDetail} />
         <AlertsStack.Screen name='AddAlert' component={AddAlert} />
      </AlertsStack.Navigator>
   );
}

const TasksStack = createNativeStackNavigator<TasksStackParamList>();

function TasksViewNavigator() {
   return (
      <TasksStack.Navigator screenOptions={{ headerShown: false }}>
         <TasksStack.Screen name='TasksList' component={Tasks} />

         <TasksStack.Screen name='TaskDetail' component={AlertDetail} />
      </TasksStack.Navigator>
   );
}

const DashboardStack = createNativeStackNavigator<DashboardStackParamList>();

function DashboardViewNavigator() {
   return (
      <DashboardStack.Navigator screenOptions={{ headerShown: false }}>
         <DashboardStack.Screen name='DashboardPage' component={Dashboard} />

         <DashboardStack.Screen
            name='DashboardAlertDetail'
            component={AlertDetail}
         />
      </DashboardStack.Navigator>
   );
}

const SettingsStack = createNativeStackNavigator<SettingsStackParamList>();

function SettingsViewNavigator() {
   const colorScheme = useAppTheme();
   const insets = useSafeAreaInsets();

   const styles = StyleSheet.create({
      header: {
         height: Dimensions.topBar.height + insets.top,
         borderBottomWidth: Dimensions.topBar.borderWidth,
         borderBottomColor: Colors[colorScheme].settingsHeaderBorderColor,
         backgroundColor: Colors[colorScheme].topBarBackground,
         display: "flex",
         flexDirection: "row",
         justifyContent: "center",
         alignItems: "center",
         paddingTop: insets.top + 8,
         paddingBottom: 12,
      },
      headerTitle: {
         fontSize: Dimensions.settings.nameTextSize,
         fontFamily: "lato-black",
         textAlign: "center",
      },
      backArrow: {
         paddingRight: 30,
         display: "flex",
         justifyContent: "center",
         position: "absolute",
         left: 0,
         paddingTop: insets.top,
      },
      initialsCircle: {
         backgroundColor: Colors[colorScheme].nameInitialsIcon,
         marginEnd: Dimensions.settings.nameInitialsIconMarginEnd,
         width: Dimensions.settings.nameInitialsIconSize,
         height: Dimensions.settings.nameInitialsIconSize,
         display: "flex",
         justifyContent: "center",
         alignItems: "center",
         borderRadius: 100,
      },
      initialsText: {
         fontFamily: "lato-bold",
         textAlign: "center",
         fontSize: Dimensions.settings.nameInitialsTextSize,
         color: Colors[colorScheme].nameInitialsIconText,
      },
   });
   return (
      <SettingsStack.Navigator
         screenOptions={({ navigation }) => ({
            header: () => (
               <DefaultView style={styles.header}>
                  <TouchableOpacity
                     activeOpacity={0.8}
                     onPress={() => navigation.goBack()}
                     style={styles.backArrow}>
                     <TopBarIcon
                        icon='backArrow'
                        position={TopBarPosition.left}
                     />
                  </TouchableOpacity>
                  <DefaultView style={styles.initialsCircle}>
                     <Text style={styles.initialsText}>JD</Text>
                  </DefaultView>
                  <Text allowFontScaling style={styles.headerTitle}>
                     John Doe
                  </Text>
               </DefaultView>
            ),
         })}>
         <SettingsStack.Screen
            name='SettingsList'
            component={Settings}
            options={{ headerTitle: "Settings" }}
         />
      </SettingsStack.Navigator>
   );
}
