import { createSlice } from "@reduxjs/toolkit";
import * as selectors from "./users.selectors";
import { GetUsersSuccessAction, UsersState } from "./users.interfaces";
import * as extraActions from "../../extra-actions";
import * as sagas from "./users.sagas";
import { User } from "models";

const initialState: UsersState = {
   allUsers: [],
};

export const usersStore = createSlice({
   name: "users",
   initialState,
   reducers: {},
   extraReducers: builder => {
      builder.addCase(
         extraActions.getUsers.success,
         (state, action: GetUsersSuccessAction) => {
            state.allUsers = action.payload.data.users.map(
               user => new User(user)
            );
         }
      );
   },
});

export { selectors, sagas };
