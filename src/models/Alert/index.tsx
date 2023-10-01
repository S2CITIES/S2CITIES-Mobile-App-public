import dayjs from "dayjs";
import { RawIntEnum } from "utils/types";

const localizedFormat = require("dayjs/plugin/localizedFormat");
dayjs.extend(localizedFormat);

export enum AlertType {
   HandSignalAlert = 0,
   GenericAlert = 1,
   EmergencyAlert = 2,
}

export type RawAlertType = RawIntEnum<AlertType>;

export interface IAlert {
   _id?: string;
   type: RawAlertType;
   zone_id?: string | null; // it might be null for both Emergency and Generic Alerts, if not provided
   address?: string | null; // it might be null for Emergency alerts, if user does not provide their position
   latitude?: string | null;
   longitude?: string | null;
   timestamp: string; // ISO 8601 timestamp, referred to GMT
   info?: string | null;
   cam?: string | null; // Not null just for HandSignalAlerts
   creator?: string | null; // id of the user who created this alert: not null just for Emergency and Generic alert
   check: {
      marked: boolean;
      user_id?: string | null;
      timestamp?: string | null; // ISO 8601 timestamp, referred to GMT
   };
   false_alarm: {
      marked: boolean;
      user_id?: string | null;
      timestamp?: string | null; // ISO 8601 timestamp, referred to GMT
   };
   assigned_users: string[];
}

export class Alert implements IAlert {
   _id?: string;
   type: RawAlertType;
   zone_id?: string | null; // it might be null for both Emergency and Generic Alerts, if not provided
   address?: string | null; // it might be null for Emergency alerts, if user does not provide their position
   latitude?: string | null;
   longitude?: string | null;
   timestamp: string; // ISO 8601 timestamp, referred to GMT
   info?: string | null;
   cam?: string | null;
   creator?: string | null; // id of the user who created this alert: not null just for Emergency and Generic alert
   check: {
      marked: boolean;
      user_id?: string | null;
      timestamp?: string | null; // ISO 8601 timestamp, referred to GMT
   };
   false_alarm: {
      marked: boolean;
      user_id?: string | null;
      timestamp?: string | null; // ISO 8601 timestamp, referred to GMT
   };
   assigned_users: string[];

   constructor(obj: IAlert) {
      Object.assign(this, obj);
   }

   toJson(): string {
      return JSON.stringify(this, null, 2);
   }

   getLocalTime(): string {
      const dateTime = dayjs(this.timestamp);
      return dateTime.format("LT");
   }

   static fromTimestampToLocalTime(timestamp: string) {
      const dateTime = dayjs(timestamp);
      return dateTime.format("LT");
   }

   getShortAddress(): string {
      const addressTokens = this.address?.trim()?.split(",") ?? [];
      const shortAddressPlace =
         addressTokens.length > 0 ? addressTokens[0] : null;
      const shortAddressCity =
         addressTokens.length > 1
            ? addressTokens[1]
                 .trimStart()
                 .split(" ")
                 .slice(1, undefined)
                 .join(" ")
            : null;

      const shortAddress = `${shortAddressPlace ?? "(No address)"}${
         shortAddressCity ? `, ${shortAddressCity}` : ""
      }${
         shortAddressPlace
            ? ""
            : this.latitude && this.longitude
            ? ` - (${this.latitude},${this.longitude})`
            : ""
      }`;

      return shortAddress;
   }

   toHeaderInfo(): AlertBasicInfo {
      return {
         id: this._id ?? "",
         type: this.type,
         cam: this.cam,
         shortAddress: this.getShortAddress(),
         localTime: this.getLocalTime(),
      };
   }
}

export type AlertBasicInfo = {
   id: string;
   type: RawAlertType;
   shortAddress: string;
   localTime?: string;
   cam?: string | null;
   timestamp?: string | null;
};
