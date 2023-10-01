import { styles } from "./styles";
import { useAppTheme } from "utils/ui";

export const useSettingsItem = () => {
   const colorScheme = useAppTheme();
   return { styles, colorScheme };
};
