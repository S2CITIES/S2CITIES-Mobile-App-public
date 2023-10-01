import { User } from "models";
import { Action } from "redux";
import {
   ApiFailData,
   ApiSuccessData,
} from "redux-store/extra-actions/apis/api-builder";
import {
   GetUsersParams,
   GetUsersResponseData,
} from "redux-store/extra-actions/apis/get-users";

export interface UsersState {
   allUsers: User[];
}

// get users
export interface GetUsersSuccessAction extends Action {
   payload: ApiSuccessData<GetUsersResponseData, GetUsersParams>;
}

export interface GetUsersFailAction extends Action {
   payload: ApiFailData<GetUsersParams>;
}
