import { IUser, User } from "models/User";
import { Use } from "react-native-svg";

export interface IZone {
   _id?: string;
   // custom props
   name: string;
   address: string;
   latitude: string;
   longitude: string;
   users: IUser[];
}

export class Zone implements IZone {
   _id?: string;
   // custom props
   name: string;
   address: string;
   latitude: string;
   longitude: string;
   users: User[];

   constructor(obj: IZone) {
      obj.users = obj.users.map(iUser => new User(iUser));
      Object.assign(this, obj);
   }
}
