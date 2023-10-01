import { IUser } from "models";
import {
   apiActionBuilder,
   apiRequestPayloadBuilder,
   ApiRequestPayloadBuilderOptions,
   ApiSuccessAction,
   ApiFailAction,
   HttpMethod,
} from "../api-builder";

export interface GetUsersParams {}
export interface GetUsersResponseData {
   users: IUser[];
}
export default apiActionBuilder<
   GetUsersParams,
   ApiSuccessAction<GetUsersResponseData, GetUsersParams>,
   ApiFailAction<GetUsersParams>
>(
   "apis/users/get",
   (params: GetUsersParams, options?: ApiRequestPayloadBuilderOptions) => ({
      payload: apiRequestPayloadBuilder<GetUsersParams>(
         {
            path: "/users",
            method: HttpMethod.GET,
         },
         options ?? { requestDelay: 0 },
         params
      ),
   })
);
