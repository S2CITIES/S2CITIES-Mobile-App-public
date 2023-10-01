import { styles } from "./styles";
import { useAppTheme } from "utils/ui";

export const useAppButton = () => {
   const colorScheme = useAppTheme();

   return { styles, colorScheme };
};
