import { RootState } from "redux-store";

export const getAjaxIsLoadingByApi =
   (api: string, path: string) => (state: RootState) => {
      return state?.ajax?.isLoading[`${api}_${path}`];
   };

export const getAlertsApiIsLoading = () =>
   getAjaxIsLoadingByApi("apis/alerts/get", "/alerts");

export const patchAlertsApiIsLoading = (alertId: string) =>
   getAjaxIsLoadingByApi(`apis/alerts/{id}/patch`, `/alerts/${alertId}`);

export const getAlertsVideoS3SignedurlIsLoading = (alertId: string) =>
   getAjaxIsLoadingByApi(
      `apis/alerts/video/s3signedurl/{alertId}/get`,
      `/alerts/video/s3signedurl/${alertId}`
   );

export const postAlertsEmergencyIsLoading = () =>
   getAjaxIsLoadingByApi("apis/alerts/emergency/post", "/alerts/emergency");

export const postAlertsGenericIsLoading = () =>
   getAjaxIsLoadingByApi("apis/alerts/generic/post", "/alerts/generic");

export const postAlertsHandSignalIsLoading = () =>
   getAjaxIsLoadingByApi(
      "apis/alerts/signalforhelp/post",
      "/alerts/signalforhelp"
   );
