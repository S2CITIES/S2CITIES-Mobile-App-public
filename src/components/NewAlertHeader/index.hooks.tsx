import { styles } from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { useAppTheme } from "utils/ui";

export const useNewAlertHeader = () => {
   const colorScheme = useAppTheme();
   const insets = useSafeAreaInsets();
   const dispatch = useDispatch();

   return { styles, colorScheme, insets, dispatch };
};
