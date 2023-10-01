import { styles } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { actions, selectors } from "redux-store";
import { useAppTheme } from "utils/ui";

export const useSettings = () => {
   const colorScheme = useAppTheme();
   const dispatch = useDispatch();

   const useSystemTheme = useSelector(selectors.getUseSystemTheme);
   const setUseSystemTheme = (bool: boolean) => {
      dispatch(actions.setUseSystemTheme(bool));
   };

   return { styles, dispatch, colorScheme, useSystemTheme, setUseSystemTheme };
};
