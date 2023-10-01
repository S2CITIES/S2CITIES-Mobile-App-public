import { RawStringEnum } from "utils";

export enum TaskFilterType {
   all = "ALL",
   todo = "TO DO",
   done = "DONE",
}

export type RawTaskFilterType = RawStringEnum<TaskFilterType>;

export interface ITaskFilter {
   type: TaskFilterType;
}

export class TaskFilter implements ITaskFilter {
   type: TaskFilterType;

   constructor(obj: ITaskFilter) {
      Object.assign(this, obj);
   }

   label() {
      return this.type.valueOf();
   }

   static values() {
      return [
         new TaskFilter({ type: TaskFilterType.all }),
         new TaskFilter({ type: TaskFilterType.todo }),
         new TaskFilter({ type: TaskFilterType.done }),
      ];
   }
}
