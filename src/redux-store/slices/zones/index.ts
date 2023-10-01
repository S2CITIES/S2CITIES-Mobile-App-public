import { createSlice } from "@reduxjs/toolkit";
import * as selectors from "./zones.selectors";
import { GetZonesSuccessAction, ZonesState } from "./zones.interfaces";
import * as extraActions from "../../extra-actions";
import * as sagas from "./zones.sagas";
import { Zone } from "models";

const initialState: ZonesState = {
   allZones: [],
};

export const zonesStore = createSlice({
   name: "zones",
   initialState,
   reducers: {},
   extraReducers: builder => {
      builder.addCase(
         extraActions.getZones.success,
         (state, action: GetZonesSuccessAction) => {
            // create Zone object from interfaces
            state.allZones = action.payload.data.zones.map(
               iZone => new Zone(iZone)
            );
         }
      );
   },
});

export { selectors, sagas };
