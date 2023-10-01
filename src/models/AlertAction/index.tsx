import { RawStringEnum } from "utils";
import Strings from "constants/Strings";
import { Alert } from "models/Alert";

export enum AlertActionType {
   assign = "assign",
   check = "check",
   false_alarm = "false_alarm",
}

export type RawAlertActionType = RawStringEnum<AlertActionType>;

export enum ActionButtonState {
   disabled = 1,
   unchecked = 2,
   checked = 3,
}

export interface IAlertAction {
   type: AlertActionType;
   label: string;
}

export class AlertAction implements IAlertAction {
   type: AlertActionType;
   label: string;

   constructor(obj: IAlertAction) {
      Object.assign(this, obj);
   }

   buttonState(alert: Alert) {
      if (!alert) return ActionButtonState.disabled; // by default

      if (this.type === AlertActionType.assign) {
         if (alert.assigned_users.length > 0) {
            return ActionButtonState.checked;
         } else {
            return ActionButtonState.unchecked;
         }
      } else if (this.type === AlertActionType.check) {
         if (alert.check.marked) {
            return ActionButtonState.checked;
         } else {
            return ActionButtonState.unchecked;
         }
      } else if (this.type === AlertActionType.false_alarm) {
         if (alert.false_alarm.marked) {
            return ActionButtonState.checked;
         } else {
            return ActionButtonState.unchecked;
         }
      } else {
         return ActionButtonState.disabled; // by default
      }
   }

   reduxTapAction(currentState: ActionButtonState, alertId: string, actions) {
      if (this.type === AlertActionType.assign)
         return; // no current actions for 'assign' button
      else if (this.type === AlertActionType.check) {
         return actions.patchAlertsById.request({
            id: alertId,
            check: {
               marked: currentState === ActionButtonState.unchecked,
            },
         });
      } else if (this.type === AlertActionType.false_alarm) {
         return actions.patchAlertsById.request({
            id: alertId,
            false_alarm: {
               marked: currentState === ActionButtonState.unchecked,
            },
         });
      }
   }

   modalTitle(currentState: ActionButtonState) {
      if (this.type === AlertActionType.assign) {
         return Strings.en.assign_alert_modal_title; // currently no modal for assign button
      } else if (this.type === AlertActionType.check) {
         if (currentState === ActionButtonState.checked) {
            // user is going to uncheck
            return Strings.en.unchecked_alert_modal_title;
         } else if (currentState === ActionButtonState.unchecked) {
            // user is going to check
            return Strings.en.checked_alert_modal_title;
         } else return;
      } else if (this.type === AlertActionType.false_alarm) {
         if (currentState === ActionButtonState.checked) {
            // user is going to uncheck the false alarm
            return Strings.en.not_false_alarm_alert_modal_title;
         } else if (currentState === ActionButtonState.unchecked) {
            // user is going to mark the false alarm
            return Strings.en.false_alarm_alert_modal_title;
         } else return;
      }
   }

   static all(): AlertAction[] {
      return [
         new AlertAction({
            type: AlertActionType.assign,
            label: Strings.en.alert_action_assign,
         }),
         new AlertAction({
            type: AlertActionType.check,
            label: Strings.en.alert_action_checked,
         }),
         new AlertAction({
            type: AlertActionType.false_alarm,
            label: Strings.en.alert_action_false_alarm,
         }),
      ];
   }
}
