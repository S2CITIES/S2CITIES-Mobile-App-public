import { User } from "models";

export function areUsersArraysEqual(
   users1: string[],
   users2: string[]
): boolean {
   if (users1 === users2) return true;
   if (!users1 || !users2) return false;
   if (users1.length !== users2.length) return false;

   return (
      users1.every(
         user1 => users2.findIndex(user2 => user2 === user1) !== -1
      ) &&
      users2.every(user2 => users1.findIndex(user1 => user1 === user2) !== -1)
   );
}
