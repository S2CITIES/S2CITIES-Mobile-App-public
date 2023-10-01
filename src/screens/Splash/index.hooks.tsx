import { useSafeAreaFrame } from "react-native-safe-area-context";
import { styles } from "./styles";
import { useWindowDimensions } from "react-native";

export const useSplash = () => {
   const safeAreaFrame = useSafeAreaFrame();
   const window = useWindowDimensions();
   return { styles, window };
};
