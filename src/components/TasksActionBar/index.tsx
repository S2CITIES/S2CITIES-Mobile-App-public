import React, { memo } from "react";
import { View as DefaultView, TouchableOpacity } from "react-native";
import { useTasksActionBar } from "./index.hooks";
import { MainActionBar } from "components/MainHeader";
import { Text } from "components/Themed";
import { TaskFilter } from "models";
import { appPrimaryBlue } from "constants/Colors";

type TasksActionBarProps = {
   activeFilter: TaskFilter;
   setFilter: (newFilter: TaskFilter) => void;
};

export const TasksActionBar = memo(
   ({ activeFilter, setFilter }: TasksActionBarProps) => {
      const { styles, filters } = useTasksActionBar();

      return (
         <MainActionBar style={styles.mainHeader}>
            <DefaultView style={styles.filterBox}>
               {filters.map((filter, i) => (
                  <DefaultView
                     key={filter.label()}
                     style={styles.filterTextWrapper}>
                     {i > 0 && <Text style={styles.filterText}>•</Text>}
                     <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={() => {
                           if (filter.type === activeFilter.type) return; // filter did not change
                           setFilter(filter);
                        }}
                        style={styles.filterButton}>
                        <Text
                           style={[
                              styles.filterText,
                              filter.type === activeFilter.type && {
                                 color: appPrimaryBlue,
                              },
                           ]}>
                           {filter.label()}
                        </Text>
                     </TouchableOpacity>
                  </DefaultView>
               ))}
            </DefaultView>
         </MainActionBar>
      );
   }
);

TasksActionBar.displayName = "TasksActionBar";
