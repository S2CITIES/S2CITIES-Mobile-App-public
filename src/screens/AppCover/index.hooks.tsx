import { useWindowDimensions } from "react-native";
import { styles } from "./styles";

export const useAppCover = () => {
   const window = useWindowDimensions();
   return { styles, window };
};
