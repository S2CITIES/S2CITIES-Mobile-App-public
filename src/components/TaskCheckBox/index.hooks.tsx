import { useAppTheme } from "utils/ui";
import { styles } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { actions, selectors } from "redux-store";

export const useTaskCheckBox = (alertId: string) => {
   const colorScheme = useAppTheme();
   const dispatch = useDispatch();
   const isTaskActionLoading = useSelector(
      selectors.patchAlertsApiIsLoading(alertId)
   );

   const checkTask = (bool: boolean) =>
      dispatch(
         actions.patchAlertsById.request({
            id: alertId,
            check: {
               marked: bool,
            },
         })
      );

   return { styles, colorScheme, checkTask, isTaskActionLoading };
};
