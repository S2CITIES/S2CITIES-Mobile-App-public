import { IAlert } from "models";
import {
   apiActionBuilder,
   apiRequestPayloadBuilder,
   ApiRequestPayloadBuilderOptions,
   ApiSuccessAction,
   ApiFailAction,
   HttpMethod,
} from "../api-builder";

export interface PostAlertsGenericParams {
   zone_id?: string | null;
   address: string;
   latitude?: string | null;
   longitude?: string | null;
   info?: string | null;
   // for video upload (optional)
   alert_id?: string | null;
   format?: string | null;
   key?: string | null;
}
export interface PostAlertsGenericResponseData {
   alert: IAlert;
}

export default apiActionBuilder<
   PostAlertsGenericParams,
   ApiSuccessAction<PostAlertsGenericResponseData, PostAlertsGenericParams>,
   ApiFailAction<PostAlertsGenericParams>
>(
   "apis/alerts/generic/post",
   (
      params: PostAlertsGenericParams,
      options?: ApiRequestPayloadBuilderOptions
   ) => ({
      payload: apiRequestPayloadBuilder<PostAlertsGenericParams>(
         {
            path: "/alerts/generic",
            method: HttpMethod.POST,
            body: params,
         },
         options ?? { requestDelay: 0 },
         params
      ),
   })
);
