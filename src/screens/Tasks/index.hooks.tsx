import { useEffect, useState } from "react";
import { TasksStyles, styles } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { actions, selectors } from "redux-store";
import { taskFilterCallback } from "utils";
import { Dispatch } from "redux";
import { Alert, TaskFilter, TaskFilterType } from "models";

type TasksHookProps = {
   styles: TasksStyles;
   allFilteredTasks: Alert[];
   groupedFilteredTasks: {
      key: string;
      data: Alert[];
   }[];
   areAlertsLoading: boolean;
   dispatch: Dispatch;
   filter: TaskFilter;
   setFilter: (filter: TaskFilter) => void;
};

export const useTasks = (): TasksHookProps => {
   const areAlertsLoading = useSelector(selectors.getAlertsApiIsLoading());
   const dispatch = useDispatch();

   const [filter, setFilter] = useState(
      new TaskFilter({ type: TaskFilterType.all })
   );

   const allTasks = useSelector(selectors.getAllTasks());
   const groupedTasks = useSelector(
      selectors.getTasksOrderedAndGroupedByDate()
   );

   const allFilteredTasks = allTasks.filter(task =>
      taskFilterCallback(task, filter)
   );
   const groupedFilteredTasks = groupedTasks
      .map(taskGroup => {
         taskGroup.data = taskGroup.data.filter(task =>
            taskFilterCallback(task, filter)
         );
         return taskGroup;
      })
      .filter(taskGroup => taskGroup.data.length > 0);

   useEffect(() => {
      // retrieve all Alerts from backend at mounting
      dispatch(actions.getAlerts.request({}));

      const timer = setInterval(() => {
         dispatch(actions.getAlerts.request({}));
      }, 30000); // refresh every 30 seconds

      return () => {
         clearInterval(timer); // stop when unmounted
      };
   }, [dispatch]);

   return {
      styles,
      allFilteredTasks,
      groupedFilteredTasks,
      areAlertsLoading,
      dispatch,
      filter,
      setFilter,
   };
};
