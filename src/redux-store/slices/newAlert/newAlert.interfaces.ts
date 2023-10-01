import { Action } from "redux";

export interface NewAlertState {
   created: boolean;
}

export interface SetCreatedAction extends Action {
   payload: {
      created: boolean;
   };
}
