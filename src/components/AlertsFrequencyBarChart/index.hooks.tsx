import { useSafeAreaFrame } from "react-native-safe-area-context";
import { styles } from "./styles";
import { useAppTheme } from "utils/ui";

export const useAlertsFrequencyBarChart = () => {
   const safeAreaFrame = useSafeAreaFrame();
   const colorScheme = useAppTheme();

   return { styles, safeAreaFrame, colorScheme };
};
