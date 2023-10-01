import { useDispatch, useSelector } from "react-redux";
import { styles } from "./styles";
import { selectors } from "redux-store";
import { AlertActionType } from "models";

export const useAlertActionButton = (
   alertId: string,
   alertActionType: AlertActionType,
   lastTappedAction: AlertActionType
) => {
   const dispatch = useDispatch();
   const loading =
      useSelector(selectors.patchAlertsApiIsLoading(alertId)) &&
      alertActionType === lastTappedAction;

   return { styles, dispatch, loading };
};
