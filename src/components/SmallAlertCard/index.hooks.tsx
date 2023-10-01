import { styles } from "./styles";
import { useAppTheme } from "utils/ui";

export const useSmallAlertCard = () => {
   const colorScheme = useAppTheme();

   return { styles, colorScheme };
};
