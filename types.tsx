/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
   CompositeScreenProps,
   NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AlertBasicInfo, AlertType } from "models";

declare global {
   namespace ReactNavigation {
      interface RootParamList extends RootStackParamList {}
   }
}

export type RootStackParamList = {
   Root: NavigatorScreenParams<RootTabParamList> | undefined;
   Modal: undefined;
   NotFound: undefined;
   Splash: SplashScreenParamList;
   Cover: undefined;
   Login: undefined;
   Settings: undefined;
   RecordAlertVideo: {
      type: AlertType;
   };
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
   NativeStackScreenProps<RootStackParamList, Screen>;

export type SplashScreenParamList = {
   number: number;
};

export type RootTabParamList = {
   Dashboard: undefined;
   Tasks: undefined;
   Alerts: undefined;
   Emergency: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
   CompositeScreenProps<
      BottomTabScreenProps<RootTabParamList, Screen>,
      CompositeScreenProps<
         NativeStackScreenProps<RootStackParamList>,
         NativeStackScreenProps<AlertsStackParamList>
      >
   >;

export type AlertsStackParamList = {
   AlertsList: undefined;
   AlertDetail: AlertBasicInfo;
   AddAlert: {
      type: AlertType;
      videoUri?: string | null;
   };
};

export type AlertsStackScreenProps<Screen extends keyof AlertsStackParamList> =
   CompositeScreenProps<
      NativeStackScreenProps<AlertsStackParamList, Screen>,
      BottomTabScreenProps<RootTabParamList>
   >;

export type TasksStackParamList = {
   TasksList: undefined;
   TaskDetail: AlertBasicInfo;
};

export type TasksStackScreenProps<Screen extends keyof TasksStackParamList> =
   CompositeScreenProps<
      NativeStackScreenProps<TasksStackParamList, Screen>,
      BottomTabScreenProps<RootTabParamList>
   >;

export type DashboardStackParamList = {
   DashboardPage: undefined;
   DashboardAlertDetail: AlertBasicInfo;
};

export type DashboardStackScreenProps<
   Screen extends keyof DashboardStackParamList
> = CompositeScreenProps<
   NativeStackScreenProps<DashboardStackParamList, Screen>,
   BottomTabScreenProps<RootTabParamList>
>;

export type SettingsStackParamList = {
   SettingsList: undefined;
};

export type SettingsStackScreenProps<
   Screen extends keyof SettingsStackParamList
> = CompositeScreenProps<
   NativeStackScreenProps<SettingsStackParamList, Screen>,
   RootStackScreenProps<"Settings">
>;
