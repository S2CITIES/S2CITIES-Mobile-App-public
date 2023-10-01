import { RootState } from "redux-store";

export const getUsers = (state: RootState) => state?.users;

export const getAllUsers = (state: RootState) => state?.users?.allUsers ?? [];
