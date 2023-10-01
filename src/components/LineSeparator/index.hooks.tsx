import { styles } from "./styles";
import { useAppTheme } from "utils/ui";

export const useLineSeparator = () => {
   const colorScheme = useAppTheme();

   return { styles, colorScheme };
};
