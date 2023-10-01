import { Zone } from "models";
import { Action } from "redux";
import {
   ApiFailData,
   ApiSuccessData,
} from "redux-store/extra-actions/apis/api-builder";
import {
   GetZonesParams,
   GetZonesResponseData,
} from "redux-store/extra-actions/apis/get-zones";

export interface ZonesState {
   allZones: Zone[];
}

// get zones
export interface GetZonesSuccessAction extends Action {
   payload: ApiSuccessData<GetZonesResponseData, GetZonesParams>;
}

export interface GetZonesFailAction extends Action {
   payload: ApiFailData<GetZonesParams>;
}
