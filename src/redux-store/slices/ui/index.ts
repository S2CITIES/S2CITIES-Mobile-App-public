import { createSlice } from "@reduxjs/toolkit";
import * as selectors from "./ui.selectors";
import {
   ToastType,
   SetToastAction,
   UiState,
   ToastDuration,
   SetModalAction,
   CloseModalAction,
   SetUseSystemThemeAction,
   OpenAssignAlertModalAction,
   CloseAssignAlertModalAction,
   SetAlertAssignmentsAction,
   SetErrorToastAction,
} from "./ui.interfaces";
import * as extraActions from "../../extra-actions";
import * as sagas from "./ui.sagas";
import {
   GetAlertsFailAction,
   PatchAlertsFailAction,
   PatchAlertsSuccessAction,
   PostAlertsGenericFailAction,
   PostAlertsGenericSuccessAction,
   PostAlertsSignalforhelpFailAction,
   PostAlertsSignalforhelpSuccessAction,
} from "../alerts/alerts.interfaces";
import {
   PostAlertsEmergencyFailAction,
   PostAlertsEmergencySuccessAction,
} from "../emergency/emergency.interfaces";
import { GetZonesFailAction } from "../zones/zones.interfaces";
import Strings from "constants/Strings";
import { GetUsersFailAction } from "../users/users.interfaces";

const initialState: UiState = {
   toasts: {},
   modal: {
      open: false,
      title: "",
      confirmCallback: () => {},
      rejectCallback: () => {},
   },
   assignAlertModal: {
      open: false,
      title: "",
      confirmCallback: () => {},
      rejectCallback: () => {},
      users: [],
      currentUsersAssignments: [],
   },
   useSystemTheme: false,
};

export const uiStore = createSlice({
   name: "ui",
   initialState,
   reducers: {
      setToast: (state, action: SetToastAction) => {
         state.toasts = {
            ...(state.toasts ?? initialState.toasts),
            [action.payload.tag]: {
               open: action.payload.open,
               message: action.payload.message,
               type: action.payload.toastType,
               duration: action.payload.duration,
            },
         };
      },
      setErrorToast: (state, action: SetErrorToastAction) => {
         state.toasts = {
            ...(state.toasts ?? initialState.toasts),
            [action.payload.tag ?? "main"]: {
               open: true,
               message: action.payload.message,
               type: ToastType.Error,
               duration: ToastDuration.Long,
            },
         };
      },
      openModal: (state, action: SetModalAction) => {
         state.modal = {
            open: true,
            title: action.payload.title,
            confirmCallback: action.payload.confirmCallback,
            rejectCallback: action.payload.rejectCallback,
            confirmLabel: action.payload.confirmLabel,
            rejectLabel: action.payload.rejectLabel,
         };
      },
      closeModal: (state, action: CloseModalAction) => {
         state.modal = {
            open: false,
            title: "",
            confirmCallback: () => {},
            rejectCallback: () => {},
         };
      },
      openAssignAlertModal: (state, action: OpenAssignAlertModalAction) => {
         state.assignAlertModal = {
            open: true,
            title: action.payload.title,
            confirmCallback: action.payload.confirmCallback,
            rejectCallback: action.payload.rejectCallback,
            confirmLabel: action.payload.confirmLabel,
            rejectLabel: action.payload.rejectLabel,
            users: action.payload.users,
            currentUsersAssignments: action.payload.currentUsersAssignments,
         };
      },
      closeAssignAlertModal: (state, action: CloseAssignAlertModalAction) => {
         state.assignAlertModal = {
            open: false,
            title: "",
            confirmCallback: () => {},
            rejectCallback: () => {},
            users: [],
            currentUsersAssignments: [],
         };
      },
      setAlertAssignments: (state, action: SetAlertAssignmentsAction) => {
         state.assignAlertModal = {
            open: state.assignAlertModal.open,
            title: state.assignAlertModal.title,
            confirmCallback: state.assignAlertModal.confirmCallback,
            rejectCallback: state.assignAlertModal.rejectCallback,
            confirmLabel: state.assignAlertModal.confirmLabel,
            rejectLabel: state.assignAlertModal.rejectLabel,
            users: state.assignAlertModal.users,
            currentUsersAssignments: action.payload.currentUsersAssignments, // change only user assignments
         };
      },
      setUseSystemTheme: (state, action: SetUseSystemThemeAction) => {
         state.useSystemTheme = action.payload;
      },
   },
   extraReducers: builder => {
      builder.addCase(extraActions.appStartup, (state, action) => {
         state.toasts = {
            ...initialState.toasts,
         };
      });

      // get alerts fail
      builder.addCase(
         extraActions.getAlerts.fail,
         (state, action: GetAlertsFailAction) => {
            state.toasts = {
               ...initialState.toasts,
               main: {
                  open: true,
                  message: `An error occurred retrieving alerts`,
                  type: ToastType.Error,
                  duration: ToastDuration.Long,
               },
            };

            console.log(
               `Error: ${action.payload.message}. Code: ${action.payload.status}`
            );
         }
      );

      // patch alert fail
      builder.addCase(
         extraActions.patchAlertsById.fail,
         (state, action: PatchAlertsFailAction) => {
            state.toasts = {
               ...initialState.toasts,
               main: {
                  open: true,
                  message: `An error occurred updating the alert`,
                  type: ToastType.Error,
                  duration: ToastDuration.Short,
               },
            };

            console.log(
               `Error: ${action.payload.message}. Code: ${action.payload.status}`
            );
         }
      );

      // patch alert success
      builder.addCase(
         extraActions.patchAlertsById.success,
         (state, action: PatchAlertsSuccessAction) => {
            let { check, false_alarm, assigned_users } =
               action.payload.prepareParams;

            let message = "Operation successfully completed";
            if (check?.marked !== undefined && check?.marked !== null) {
               message = `Alert successfully marked as ${
                  check.marked ? "" : "un"
               }checked`;
            } else if (
               false_alarm?.marked !== undefined &&
               false_alarm?.marked !== null
            ) {
               message = `Alert successfully marked as ${
                  false_alarm.marked ? "false" : "true"
               } alarm`;
            } else if (assigned_users) {
               message = "Task assignments successfully updated";
            }

            state.toasts = {
               ...initialState.toasts,
               main: {
                  open: true,
                  message: message,
                  type: ToastType.Success,
                  duration: ToastDuration.Short,
               },
            };
         }
      );

      // post emergency success
      builder.addCase(
         extraActions.postAlertsEmergency.success,
         (state, action: PostAlertsEmergencySuccessAction) => {
            state.toasts = {
               ...initialState.toasts,
               main: {
                  open: true,
                  message: "Emergency alert successfully sent",
                  type: ToastType.Success,
                  duration: ToastDuration.Short,
               },
            };
         }
      );

      // post emergency fail
      builder.addCase(
         extraActions.postAlertsEmergency.fail,
         (state, action: PostAlertsEmergencyFailAction) => {
            state.toasts = {
               ...initialState.toasts,
               main: {
                  open: true,
                  message:
                     "Warning: an error occurred sending the Emergency alert",
                  type: ToastType.Error,
                  duration: ToastDuration.Short,
               },
            };
         }
      );

      // get zones fail
      builder.addCase(
         extraActions.getZones.fail,
         (state, action: GetZonesFailAction) => {
            state.toasts = {
               ...initialState.toasts,
               main: {
                  open: true,
                  message: Strings.en.get_zones_modal_error_message,
                  type: ToastType.Error,
                  duration: ToastDuration.Long,
               },
            };

            console.log(
               `Error: ${action.payload.message}. Code: ${action.payload.status}`
            );
         }
      );

      // post generic success
      builder.addCase(
         extraActions.postAlertsGeneric.success,
         (state, action: PostAlertsGenericSuccessAction) => {
            state.toasts = {
               ...initialState.toasts,
               main: {
                  open: true,
                  message: Strings.en.add_alert_success_toast_message,
                  type: ToastType.Success,
                  duration: ToastDuration.Short,
               },
            };
         }
      );

      // post generic fail
      builder.addCase(
         extraActions.postAlertsGeneric.fail,
         (state, action: PostAlertsGenericFailAction) => {
            state.toasts = {
               ...initialState.toasts,
               main: {
                  open: true,
                  message: Strings.en.add_alert_error_toast_message,
                  type: ToastType.Error,
                  duration: ToastDuration.Short,
               },
            };
         }
      );

      // post hand signal success
      builder.addCase(
         extraActions.postAlertsSignalforhelp.success,
         (state, action: PostAlertsSignalforhelpSuccessAction) => {
            state.toasts = {
               ...initialState.toasts,
               main: {
                  open: true,
                  message: Strings.en.add_alert_success_toast_message,
                  type: ToastType.Success,
                  duration: ToastDuration.Short,
               },
            };
         }
      );

      // post hand signal fail
      builder.addCase(
         extraActions.postAlertsSignalforhelp.fail,
         (state, action: PostAlertsSignalforhelpFailAction) => {
            state.toasts = {
               ...initialState.toasts,
               main: {
                  open: true,
                  message: Strings.en.add_alert_error_toast_message,
                  type: ToastType.Error,
                  duration: ToastDuration.Short,
               },
            };
         }
      );

      // get users fail
      builder.addCase(
         extraActions.getUsers.fail,
         (state, action: GetUsersFailAction) => {
            state.toasts = {
               ...initialState.toasts,
               main: {
                  open: true,
                  message: Strings.en.get_users_modal_error_message,
                  type: ToastType.Error,
                  duration: ToastDuration.Long,
               },
            };

            console.log(
               `Error: ${action.payload.message}. Code: ${action.payload.status}`
            );
         }
      );

      /*
      // manage expo token save fail
      builder.addCase(extraActions.putUsersExpotoken.fail, (state, action) => {
         const errorMessage = action.payload?.message ?? "";

         console.log(
            `Failed sending user expo token to BE.\nCode: ${
               action.payload?.status ?? "000"
            }\nMessage: ${errorMessage}`
         );

         // show error toast
         state.toasts = {
            ...initialState.toasts,
            main: {
               open: true,
               message: `An error occurred registering for notifications (code: ${action.payload?.status})\nError message: ${errorMessage}`,
               type: ToastType.Error,
               duration: ToastDuration.Long,
            },
         };
      });

      // manage expo token sent (* temporary *)
      builder.addCase(
         extraActions.putUsersExpotoken.success,
         (state, action) => {
            // show error toast
            state.toasts = {
               ...initialState.toasts,
               main: {
                  open: true,
                  message: "Expo token sent",
                  type: ToastType.Success,
                  duration: ToastDuration.Long,
               },
            };
         }
      );
      */
   },
});

export { selectors, sagas };
