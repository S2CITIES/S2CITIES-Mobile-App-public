import { useDispatch, useSelector } from "react-redux";
import { styles } from "./styles";
import { actions, selectors } from "redux-store";
import { useSafeAreaFrame } from "react-native-safe-area-context";
import { useAppTheme } from "utils/ui";

export const useAppModal = () => {
   const modalProps = useSelector(selectors.getModal);
   const dispatch = useDispatch();
   const colorScheme = useAppTheme();
   const safeAreaFrame = useSafeAreaFrame();

   const closeModal = () => {
      dispatch(actions.closeModal());
   };

   return { styles, colorScheme, safeAreaFrame, modalProps, closeModal };
};
