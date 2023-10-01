import { styles } from "./styles";
import { useAppTheme } from "utils/ui";

export const useSpinner = () => {
   const colorScheme = useAppTheme();

   return { styles, colorScheme };
};
