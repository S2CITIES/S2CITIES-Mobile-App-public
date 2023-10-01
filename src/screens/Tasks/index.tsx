import React, { memo } from "react";
import {
   View,
   Text,
   LineSeparator,
   TaskCheckBox,
   TasksActionBar,
} from "../../components";
import { useTasks } from "./index.hooks";
import { TasksStackScreenProps } from "../../../types";
import Strings from "constants/Strings";
import { SectionList } from "react-native";
import { formattedDateOf } from "utils";
import { actions } from "redux-store";
import { TaskFilterType } from "models";

type TasksProps = {} & TasksStackScreenProps<"TasksList">;

export const Tasks = memo(({ navigation }: TasksProps) => {
   const {
      styles,
      allFilteredTasks,
      groupedFilteredTasks,
      areAlertsLoading,
      dispatch,
      filter,
      setFilter,
   } = useTasks();

   return (
      <View style={styles.mainContainer}>
         <TasksActionBar activeFilter={filter} setFilter={setFilter} />

         {(allFilteredTasks.length > 0 || areAlertsLoading) && (
            <SectionList
               sections={groupedFilteredTasks}
               keyExtractor={item => item._id}
               renderItem={({ item }) => (
                  <TaskCheckBox
                     task={item}
                     goToAlertDetail={() => {
                        navigation.navigate("TaskDetail", item.toHeaderInfo());
                     }}
                  />
               )}
               renderSectionHeader={({ section }) => {
                  const formattedDate = formattedDateOf(
                     section.data[0].timestamp
                  );
                  return <LineSeparator label={formattedDate} />;
               }}
               stickySectionHeadersEnabled={false}
               contentContainerStyle={styles.tasksSectionList}
               refreshing={areAlertsLoading}
               onRefresh={() => dispatch(actions.getAlerts.request({}))}
            />
         )}

         {!areAlertsLoading && allFilteredTasks.length === 0 && (
            <Text style={styles.placeholderText}>
               {filter?.type === TaskFilterType.all
                  ? Strings.en.tasks_you_dont_have_any_task
                  : Strings.en.tasks_no_tasks}
            </Text>
         )}
      </View>
   );
});

Tasks.displayName = "Tasks";
