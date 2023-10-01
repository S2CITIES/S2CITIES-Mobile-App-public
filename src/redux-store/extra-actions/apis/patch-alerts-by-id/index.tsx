import { IAlert } from "models";
import {
   apiActionBuilder,
   apiRequestPayloadBuilder,
   ApiRequestPayloadBuilderOptions,
   ApiSuccessAction,
   ApiFailAction,
   HttpMethod,
} from "../api-builder";

export interface PatchAlertsByIdParams {
   id: string;
   check?: {
      marked: boolean;
   };
   false_alarm?: {
      marked: boolean;
   };
   assigned_users?: string[];
}
export interface PatchAlertsByIdResponseData {
   message?: string;
   alert: IAlert;
}
export default apiActionBuilder<
   PatchAlertsByIdParams,
   ApiSuccessAction<PatchAlertsByIdResponseData, PatchAlertsByIdParams>,
   ApiFailAction<PatchAlertsByIdParams>
>(
   "apis/alerts/{id}/patch",
   (
      params: PatchAlertsByIdParams,
      options?: ApiRequestPayloadBuilderOptions
   ) => ({
      payload: apiRequestPayloadBuilder<PatchAlertsByIdParams>(
         {
            path: `/alerts/${params.id}`,
            method: HttpMethod.PATCH,
            body: params,
         },
         options ?? { requestDelay: 0 },
         params
      ),
   })
);
