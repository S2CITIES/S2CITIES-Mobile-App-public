import { styles } from "./styles";
import { useAppTheme } from "utils/ui";

export const useViewHeader = () => {
   const colorScheme = useAppTheme();

   return { styles, colorScheme };
};
