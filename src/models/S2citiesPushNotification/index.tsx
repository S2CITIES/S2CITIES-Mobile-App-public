import { RawIntEnum } from "utils";

export enum NotificationType {
   HandSignalAlert = 1,
   GenericAlert = 2,
   EmergencyAlert = 3,
}

export type RawNotificationType = RawIntEnum<NotificationType>;

export interface IS2citiesPushNotification {
   type: NotificationType;
   data: object;
}

export class S2citiesPushNotification implements IS2citiesPushNotification {
   type: NotificationType;
   data: object;

   constructor(obj: IS2citiesPushNotification) {
      Object.assign(this, obj);
   }
}
