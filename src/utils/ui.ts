import { useColorScheme } from "react-native";
import { useSelector } from "react-redux";
import { selectors } from "redux-store";

export function useAppTheme() {
   const defaultTheme = "dark";
   const colorScheme = useColorScheme();
   const useSystemTheme = useSelector(selectors.getUseSystemTheme);

   return useSystemTheme ? colorScheme : defaultTheme;
}
