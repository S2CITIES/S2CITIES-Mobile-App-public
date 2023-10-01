import {
   apiActionBuilder,
   apiRequestPayloadBuilder,
   ApiRequestPayloadBuilderOptions,
   ApiSuccessAction,
   ApiFailAction,
   HttpMethod,
} from "../api-builder";

export interface GetAlertsVideoS3signedurlsParams {
   alertIds: string[];
}
export interface GetAlertsVideoS3signedurlsResponseData {
   signedUrls: string[];
}
export default apiActionBuilder<
   GetAlertsVideoS3signedurlsParams,
   ApiSuccessAction<
      GetAlertsVideoS3signedurlsResponseData,
      GetAlertsVideoS3signedurlsParams
   >,
   ApiFailAction<GetAlertsVideoS3signedurlsParams>
>(
   "apis/alerts/video/s3signedurls/get",
   (
      params: GetAlertsVideoS3signedurlsParams,
      options?: ApiRequestPayloadBuilderOptions
   ) => ({
      payload: apiRequestPayloadBuilder<GetAlertsVideoS3signedurlsParams>(
         {
            path: `/alerts/video/s3signedurls?${params.alertIds
               .map(id => `alertIds=${id}`)
               .join("&")}`,
            method: HttpMethod.GET,
         },
         options ?? { requestDelay: 0 },
         params
      ),
   })
);
