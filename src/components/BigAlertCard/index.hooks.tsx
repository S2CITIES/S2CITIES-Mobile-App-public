import { useSafeAreaFrame } from "react-native-safe-area-context";
import { styles } from "./styles";
import { useSelector } from "react-redux";
import { selectors } from "redux-store";
import { useAppTheme } from "utils/ui";

export const useBigAlertCard = (alertId: string) => {
   const safeAreaFrame = useSafeAreaFrame();
   const colorScheme = useAppTheme();
   const alertVideoUrl = useSelector(selectors.getAlertVideoUrl(alertId));

   return { styles, colorScheme, safeAreaFrame, alertVideoUrl };
};
