import { TaskFilter } from "models";
import { styles } from "./styles";

export const useTasksActionBar = () => {
   const filters = TaskFilter.values();

   return { styles, filters };
};
