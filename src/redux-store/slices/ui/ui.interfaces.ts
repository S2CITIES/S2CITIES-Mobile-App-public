import { User } from "models";
import { Action } from "redux";

export enum ToastType {
   Error = "❌",
   Warning = "⚠️",
   Success = "✅",
   Info = "ℹ️",
}

export enum ToastDuration {
   Short = 1,
   Medium = 2,
   Long = 3,
}

export interface UiState {
   toasts: {
      [tag: string]: {
         open: boolean;
         message: string;
         type: ToastType;
         duration: ToastDuration;
      };
   };
   modal: {
      open: boolean;
      title: string;
      confirmCallback: () => void;
      rejectCallback: () => void;
      confirmLabel?: string;
      rejectLabel?: string;
   };
   assignAlertModal: {
      open: boolean;
      title: string;
      confirmCallback: (assignedUsers: string[]) => void;
      rejectCallback: () => void;
      confirmLabel?: string;
      rejectLabel?: string;
      users: User[];
      currentUsersAssignments: User[]; // users to display in the list
   };
   useSystemTheme: boolean;
}

export interface SetToastAction extends Action {
   payload: {
      tag: string;
      open: boolean;
      toastType: ToastType;
      message: string;
      duration: ToastDuration;
   };
}

export interface SetErrorToastAction extends Action {
   payload: {
      tag?: string;
      message: string;
   };
}

export interface SetModalAction extends Action {
   payload: {
      title: string;
      confirmCallback: () => void;
      rejectCallback: () => void;
      confirmLabel?: string;
      rejectLabel?: string;
   };
}

export interface CloseModalAction extends Action {}

export interface SetUseSystemThemeAction extends Action {
   payload: boolean;
}

export interface OpenAssignAlertModalAction extends Action {
   payload: {
      title: string;
      confirmCallback: (assignedUsersIds: string[]) => void;
      rejectCallback: () => void;
      confirmLabel?: string;
      rejectLabel?: string;
      users: User[];
      currentUsersAssignments: User[]; // users to display in the list
   };
}

export interface CloseAssignAlertModalAction extends Action {}

export interface SetAlertAssignmentsAction extends Action {
   payload: {
      currentUsersAssignments: User[];
   };
}
