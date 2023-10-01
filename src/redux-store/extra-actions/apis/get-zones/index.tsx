import { IZone } from "models";
import {
   apiActionBuilder,
   apiRequestPayloadBuilder,
   ApiRequestPayloadBuilderOptions,
   ApiSuccessAction,
   ApiFailAction,
   HttpMethod,
} from "../api-builder";

export interface GetZonesParams {}
export interface GetZonesResponseData {
   zones: IZone[];
}

export default apiActionBuilder<
   GetZonesParams,
   ApiSuccessAction<GetZonesResponseData, GetZonesParams>,
   ApiFailAction<GetZonesParams>
>(
   "apis/zones/get",
   (params: GetZonesParams, options?: ApiRequestPayloadBuilderOptions) => ({
      payload: apiRequestPayloadBuilder<GetZonesParams>(
         {
            path: "/zones",
            method: HttpMethod.GET,
         },
         options ?? { requestDelay: 0 },
         params
      ),
   })
);
