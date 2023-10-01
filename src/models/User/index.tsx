export interface IUser {
   id: string;
   first_name: string;
   last_name: string;
   selected?: boolean;
}

export class User implements IUser {
   id: string;
   first_name: string;
   last_name: string;
   selected?: boolean;

   constructor(obj: IUser) {
      Object.assign(this, obj);
   }
}
