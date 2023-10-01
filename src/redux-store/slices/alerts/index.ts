import { createSlice } from "@reduxjs/toolkit";
import * as selectors from "./alerts.selectors";
import {
   AlertsState,
   GetAlertsSuccessAction,
   PatchAlertsSuccessAction,
} from "./alerts.interfaces";
import * as extraActions from "../../extra-actions";
import * as sagas from "./alerts.sagas";
import { Alert } from "models";

const initialState: AlertsState = {
   allAlerts: [],
};

export const alertsStore = createSlice({
   name: "alerts",
   initialState,
   reducers: {},
   extraReducers: builder => {
      // get alerts
      builder.addCase(
         extraActions.getAlerts.success,
         (state, action: GetAlertsSuccessAction) => {
            // overwrite all alerts with the objects coming from the request
            state.allAlerts = action.payload.data.alerts.map(iAlert => {
               // create an Alert instance for each received raw alert interface
               return new Alert(iAlert);
            });
         }
      );

      // patch alert
      builder.addCase(
         extraActions.patchAlertsById.success,
         (state, action: PatchAlertsSuccessAction) => {
            const alertId = action.payload.prepareParams.id;
            const updatedAlert = new Alert(action.payload.data.alert);

            // substitute just the updated alert
            state.allAlerts = state.allAlerts.map(alert => {
               if (alert._id === alertId) {
                  return updatedAlert;
               } else return alert;
            });
         }
      );
   },
});

export { selectors, sagas };
