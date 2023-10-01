/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";

import { RootStackParamList } from "../../types";

const linking: LinkingOptions<RootStackParamList> = {
   prefixes: [Linking.createURL("/")],
   config: {
      screens: {
         Root: {
            screens: {
               Dashboard: {
                  screens: {
                     DashboardScreen: "dashboard",
                  },
               },
               Tasks: {
                  screens: {
                     TasksScreen: "tasks",
                  },
               },
               Alerts: {
                  screens: {
                     AlertsScreen: "alerts",
                  },
               },
               Emergency: {
                  screens: {
                     EmergencyScreen: "emergency",
                  },
               },
            },
         },
         NotFound: "*",
      },
   },
};

export default linking;
