import { RootState } from "redux-store";
import { ToastType } from "./ui.interfaces";

export const getToasts = (state: RootState) => state?.ui?.toasts ?? {};

export const getToast = (tag: string) => (state: RootState) => {
   const toasts = state?.ui?.toasts ?? {};
   const toast = toasts[tag] ?? {
      open: false,
      message: "",
      type: ToastType.Error,
   };
   return toast;
};

export const getModal = (state: RootState) => {
   const modalProps = state?.ui?.modal ?? {
      open: false,
      title: "",
      confirmCallback: () => {},
      rejectCallback: () => {},
   };

   return modalProps;
};

export const getAssignAlertModal = (state: RootState) => {
   const modalProps = state?.ui?.assignAlertModal ?? {
      open: false,
      title: "",
      confirmCallback: () => {},
      rejectCallback: () => {},
      users: [],
      currentUsersAssignments: [],
   };

   return modalProps;
};

export const getUseSystemTheme = (state: RootState) => {
   const useSystemTheme = state?.ui?.useSystemTheme ?? false;

   return useSystemTheme; // do not use system theme by default
};
