import { Action } from "redux";
import {
   ApiFailData,
   ApiSuccessData,
} from "redux-store/extra-actions/apis/api-builder";
import {
   PostAlertsEmergencyParams,
   PostAlertsEmergencyResponseData,
} from "redux-store/extra-actions/apis/post-alerts-emergency";

export interface EmergencyState {
   emergenciesSent: number;
}

// post emergency
export interface PostAlertsEmergencySuccessAction extends Action {
   payload: ApiSuccessData<
      PostAlertsEmergencyResponseData,
      PostAlertsEmergencyParams
   >;
}

export interface PostAlertsEmergencyFailAction extends Action {
   payload: ApiFailData<PostAlertsEmergencyParams>;
}
