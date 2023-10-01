import { RootState } from "redux-store";

export const getEmergency = (state: RootState) => state?.emergency;

export const getEmergenciesSent = (state: RootState) => {
   return state?.emergency?.emergenciesSent ?? 0;
};

export const isEmergencySent = (state: RootState) => {
   return (state?.emergency?.emergenciesSent ?? 0) > 0;
};
