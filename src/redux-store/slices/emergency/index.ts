import { createSlice } from "@reduxjs/toolkit";
import * as selectors from "./emergency.selectors";
import { EmergencyState } from "./emergency.interfaces";
import * as extraActions from "../../extra-actions";
import * as sagas from "./emergency.sagas";

const initialState: EmergencyState = {
   emergenciesSent: 0,
};

export const emergencyStore = createSlice({
   name: "emergency",
   initialState,
   reducers: {},
   extraReducers: builder => {
      builder.addCase(
         extraActions.postAlertsEmergency.success,
         (state, action) => {
            // increase number of sent emergencies
            state.emergenciesSent = (state.emergenciesSent ?? 0) + 1;
         }
      );
   },
});

export { selectors, sagas };
