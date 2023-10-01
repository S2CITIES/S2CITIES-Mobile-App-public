import { styles } from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAppTheme } from "utils/ui";

export const useAlertHeader = () => {
   let colorScheme = useAppTheme();
   let insets = useSafeAreaInsets();

   return { styles, colorScheme, insets };
};
