import { IAlert } from "models";
import {
   apiActionBuilder,
   apiRequestPayloadBuilder,
   ApiRequestPayloadBuilderOptions,
   ApiSuccessAction,
   ApiFailAction,
   HttpMethod,
} from "../api-builder";

export interface PostAlertsSignalforhelpParams {
   zone_id?: string | null;
   alert_id: string;
   address: string;
   info?: string | null;
   latitude?: string | null;
   longitude?: string | null;
   format: string;
   key: string;
}
export interface PostAlertsSignalforhelpResponseData {
   alert: IAlert;
}

export default apiActionBuilder<
   PostAlertsSignalforhelpParams,
   ApiSuccessAction<
      PostAlertsSignalforhelpResponseData,
      PostAlertsSignalforhelpParams
   >,
   ApiFailAction<PostAlertsSignalforhelpParams>
>(
   "apis/alerts/signalforhelp/post",
   (
      params: PostAlertsSignalforhelpParams,
      options?: ApiRequestPayloadBuilderOptions
   ) => ({
      payload: apiRequestPayloadBuilder<PostAlertsSignalforhelpParams>(
         {
            path: "/alerts/signalforhelp",
            method: HttpMethod.POST,
            body: params,
         },
         options ?? { requestDelay: 0 },
         params
      ),
   })
);
