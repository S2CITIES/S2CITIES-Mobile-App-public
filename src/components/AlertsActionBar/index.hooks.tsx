import { styles } from "./styles";
import { useAppTheme } from "utils/ui";

export const useAlertsHeader = () => {
   const colorScheme = useAppTheme();
   return { styles, colorScheme };
};
