export interface IAlertVideo {
   alertId: string;
   videoUrl: string;
}

export class AlertVideo implements IAlertVideo {
   alertId: string;
   videoUrl: string;

   constructor(obj: IAlertVideo) {
      Object.assign(this, obj);
   }
}
