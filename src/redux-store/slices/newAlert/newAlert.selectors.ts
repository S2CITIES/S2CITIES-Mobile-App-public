import { RootState } from "redux-store";

export const getNewAlert = (state: RootState) => state?.newAlert;

export const isNewAlertCreated = (state: RootState) =>
   state?.newAlert?.created ?? false;
