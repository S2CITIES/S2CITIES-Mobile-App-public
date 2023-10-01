import {
   apiActionBuilder,
   apiRequestPayloadBuilder,
   ApiRequestPayloadBuilderOptions,
   ApiSuccessAction,
   ApiFailAction,
   HttpMethod,
} from "../api-builder";

export interface GetAlertsVideoS3signedurlByAlertIdParams {
   alertId: string;
}
export interface GetAlertsVideoS3signedurlByAlertIdResponseData {
   download_signed_url: string;
}

export default apiActionBuilder<
   GetAlertsVideoS3signedurlByAlertIdParams,
   ApiSuccessAction<
      GetAlertsVideoS3signedurlByAlertIdResponseData,
      GetAlertsVideoS3signedurlByAlertIdParams
   >,
   ApiFailAction<GetAlertsVideoS3signedurlByAlertIdParams>
>(
   "apis/alerts/video/s3signedurl/{alertId}/get",
   (
      params: GetAlertsVideoS3signedurlByAlertIdParams,
      options?: ApiRequestPayloadBuilderOptions
   ) => ({
      payload:
         apiRequestPayloadBuilder<GetAlertsVideoS3signedurlByAlertIdParams>(
            {
               path: `/alerts/video/s3signedurl/${params.alertId}`,
               method: HttpMethod.GET,
            },
            options ?? { requestDelay: 0 },
            params
         ),
   })
);
