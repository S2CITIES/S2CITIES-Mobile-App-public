import Dimensions from "constants/Dimensions";
import { StyleSheet } from "react-native";

type TasksActionBarStylesProps = {
   mainHeader;
   filterBox;
   filterText;
   filterButton;
   filterTextWrapper;
};

export const styles = StyleSheet.create({
   mainHeader: {
      paddingHorizontal: Dimensions.tasksHeader.paddingHorizontal,
      paddingVertical: Dimensions.tasksHeader.paddingVertical,
   },
   filterBox: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
   },
   filterText: {
      fontFamily: "lato-bold",
      fontSize: Dimensions.tasksHeader.filterTextSize,
   },
   filterButton: {
      paddingHorizontal: Dimensions.tasksHeader.filterPaddingHorizontal,
      paddingVertical: Dimensions.tasksHeader.filterPaddingVertical,
   },
   filterTextWrapper: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
   },
});

export type TasksActionBarStyles =
   StyleSheet.NamedStyles<TasksActionBarStylesProps>;
