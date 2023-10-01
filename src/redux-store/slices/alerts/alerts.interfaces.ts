import { Alert } from "models";
import { Action } from "redux";
import {
   ApiFailData,
   ApiSuccessData,
} from "redux-store/extra-actions/apis/api-builder";
import {
   GetAlertsParams,
   GetAlertsResponseData,
} from "redux-store/extra-actions/apis/get-alerts";
import {
   GetAlertsVideoS3signedurlByAlertIdParams,
   GetAlertsVideoS3signedurlByAlertIdResponseData,
} from "redux-store/extra-actions/apis/get-alerts-video-s3signedurl-by-alert-id";
import {
   GetAlertsVideoS3signedurlsParams,
   GetAlertsVideoS3signedurlsResponseData,
} from "redux-store/extra-actions/apis/get-alerts-video-s3signedurls";
import {
   PatchAlertsByIdParams,
   PatchAlertsByIdResponseData,
} from "redux-store/extra-actions/apis/patch-alerts-by-id";
import {
   PostAlertsGenericParams,
   PostAlertsGenericResponseData,
} from "redux-store/extra-actions/apis/post-alerts-generic";
import {
   PostAlertsSignalforhelpParams,
   PostAlertsSignalforhelpResponseData,
} from "redux-store/extra-actions/apis/post-alerts-signalforhelp";

export interface AlertsState {
   allAlerts: Alert[];
}

// get alerts
export interface GetAlertsSuccessAction extends Action {
   payload: ApiSuccessData<GetAlertsResponseData, GetAlertsParams>;
}

export interface GetAlertsFailAction extends Action {
   payload: ApiFailData<GetAlertsParams>;
}

// patch alerts
export interface PatchAlertsSuccessAction extends Action {
   payload: ApiSuccessData<PatchAlertsByIdResponseData, PatchAlertsByIdParams>;
}

export interface PatchAlertsFailAction extends Action {
   payload: ApiFailData<PatchAlertsByIdParams>;
}

// get alertsVideoS3Signedurl
export interface GetAlertsVideoS3SignedurlSuccessAction extends Action {
   payload: ApiSuccessData<
      GetAlertsVideoS3signedurlByAlertIdResponseData,
      GetAlertsVideoS3signedurlByAlertIdParams
   >;
}

export interface GetAlertsVideoS3SignedurlFailAction extends Action {
   payload: ApiFailData<GetAlertsVideoS3signedurlByAlertIdParams>;
}

// get multiple alertsVideoS3Signedurls
export interface GetAlertsVideoS3SignedurlsSuccessAction extends Action {
   payload: ApiSuccessData<
      GetAlertsVideoS3signedurlsResponseData,
      GetAlertsVideoS3signedurlsParams
   >;
}

export interface GetAlertsVideoS3SignedurlsFailAction extends Action {
   payload: ApiFailData<GetAlertsVideoS3signedurlsParams>;
}

// post generic alert
export interface PostAlertsGenericSuccessAction extends Action {
   payload: ApiSuccessData<
      PostAlertsGenericResponseData,
      PostAlertsGenericParams
   >;
}

export interface PostAlertsGenericFailAction extends Action {
   payload: ApiFailData<PostAlertsGenericParams>;
}

// post hand signal alert
export interface PostAlertsSignalforhelpSuccessAction extends Action {
   payload: ApiSuccessData<
      PostAlertsSignalforhelpResponseData,
      PostAlertsSignalforhelpParams
   >;
}

export interface PostAlertsSignalforhelpFailAction extends Action {
   payload: ApiFailData<PostAlertsSignalforhelpParams>;
}
