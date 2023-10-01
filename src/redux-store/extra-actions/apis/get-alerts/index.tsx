import { IAlert } from "models";
import {
   apiActionBuilder,
   apiRequestPayloadBuilder,
   ApiRequestPayloadBuilderOptions,
   ApiSuccessAction,
   ApiFailAction,
   HttpMethod,
} from "../api-builder";

export interface GetAlertsParams {}
export interface GetAlertsResponseData {
   alerts: IAlert[];
}

export default apiActionBuilder<
   GetAlertsParams,
   ApiSuccessAction<GetAlertsResponseData, GetAlertsParams>,
   ApiFailAction<GetAlertsParams>
>(
   "apis/alerts/get",
   (params: GetAlertsParams, options?: ApiRequestPayloadBuilderOptions) => ({
      payload: apiRequestPayloadBuilder<GetAlertsParams>(
         {
            path: "/alerts",
            method: HttpMethod.GET,
         },
         options ?? { requestDelay: 0 },
         params
      ),
   })
);
