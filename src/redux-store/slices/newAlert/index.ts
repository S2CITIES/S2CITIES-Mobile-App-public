import { createSlice } from "@reduxjs/toolkit";
import * as selectors from "./newAlert.selectors";
import { NewAlertState, SetCreatedAction } from "./newAlert.interfaces";
import * as extraActions from "../../extra-actions";
import { PostAlertsGenericSuccessAction } from "../alerts/alerts.interfaces";

const initialState: NewAlertState = {
   created: false,
};

export const newAlertStore = createSlice({
   name: "newAlert",
   initialState,
   reducers: {
      setCreated: (state, action: SetCreatedAction) => {
         state.created = action?.payload?.created ?? false;
      },
   },

   extraReducers: builder => {
      // post generic alert
      builder.addCase(
         extraActions.postAlertsGeneric.success,
         (state, action: PostAlertsGenericSuccessAction) => {
            state.created = true;
         }
      );

      // post hand signal alert
      builder.addCase(
         extraActions.postAlertsSignalforhelp.success,
         (state, action: PostAlertsGenericSuccessAction) => {
            state.created = true;
         }
      );
   },
});

export { selectors };
