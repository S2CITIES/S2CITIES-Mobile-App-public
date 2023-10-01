import { useAppTheme } from "utils/ui";
import { styles } from "./styles";

export const useAlertsCountRingChart = () => {
   const colorScheme = useAppTheme();
   return { styles, colorScheme };
};
