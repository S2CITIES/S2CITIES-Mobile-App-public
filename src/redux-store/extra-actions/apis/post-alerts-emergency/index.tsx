import {
   apiActionBuilder,
   apiRequestPayloadBuilder,
   ApiRequestPayloadBuilderOptions,
   ApiSuccessAction,
   ApiFailAction,
   HttpMethod,
} from "../api-builder";

export interface PostAlertsEmergencyParams {
   address?: string | null;
   latitude?: string | null;
   longitude?: string | null;
}
export interface PostAlertsEmergencyResponseData {}
export default apiActionBuilder<
   PostAlertsEmergencyParams,
   ApiSuccessAction<PostAlertsEmergencyResponseData, PostAlertsEmergencyParams>,
   ApiFailAction<PostAlertsEmergencyParams>
>(
   "apis/alerts/emergency/post",
   (
      params: PostAlertsEmergencyParams,
      options?: ApiRequestPayloadBuilderOptions
   ) => ({
      payload: apiRequestPayloadBuilder<PostAlertsEmergencyParams>(
         {
            path: "/alerts/emergency",
            method: HttpMethod.POST,
            body: params,
         },
         options ?? { requestDelay: 0 },
         params
      ),
   })
);
