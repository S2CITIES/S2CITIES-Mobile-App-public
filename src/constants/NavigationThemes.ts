import { Theme } from "@react-navigation/native";
import Colors from "./Colors";

export const DarkTheme: Theme = {
   dark: true,
   colors: {
      primary: Colors.dark.primary,
      background: Colors.dark.background,
      card: Colors.dark.bottomBarBackground,
      text: Colors.dark.text,
      border: "rgb(39, 39, 41)",
      notification: "rgb(255, 69, 58)",
   },
};

export const DefaultTheme: Theme = {
   dark: false,
   colors: {
      primary: Colors.light.primary,
      background: Colors.light.background,
      card: Colors.light.bottomBarBackground,
      text: Colors.light.text,
      border: "rgb(216, 216, 216)",
      notification: "rgb(255, 59, 48)",
   },
};
