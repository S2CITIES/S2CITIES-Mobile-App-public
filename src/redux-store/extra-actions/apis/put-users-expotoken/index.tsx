import {
   apiActionBuilder,
   apiRequestPayloadBuilder,
   ApiRequestPayloadBuilderOptions,
   ApiSuccessAction,
   ApiFailAction,
   HttpMethod,
} from "../api-builder";

export interface PutUsersExpotokenParams {
   token: string;
}
export interface PutUsersExpotokenResponseData {}

export default apiActionBuilder<
   PutUsersExpotokenParams,
   ApiSuccessAction<PutUsersExpotokenResponseData, PutUsersExpotokenParams>,
   ApiFailAction<PutUsersExpotokenParams>
>(
   "apis/users/expotoken/put",
   (
      params: PutUsersExpotokenParams,
      options?: ApiRequestPayloadBuilderOptions
   ) => ({
      payload: apiRequestPayloadBuilder<PutUsersExpotokenParams>(
         {
            path: "/users/expotoken",
            method: HttpMethod.PUT,
            body: params,
         },
         options ?? { requestDelay: 0 },
         params
      ),
   })
);
