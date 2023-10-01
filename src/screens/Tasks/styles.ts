import Dimensions from "constants/Dimensions";
import { StyleSheet } from "react-native";

type TasksStylesProps = {
   mainContainer;
   tasksSectionList;
   placeholderText;
   tempTaskText;
};

export const styles: TasksStyles = StyleSheet.create({
   mainContainer: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "stretch",
   },
   tasksSectionList: {
      paddingTop: Dimensions.mainContainer.defaultPaddingTop,
      paddingBottom: Dimensions.mainContainer.defaultPaddingBottom,
   },
   placeholderText: {
      fontSize: 22,
      fontFamily: "lato-bold",
      marginVertical: 50,
      textAlign: "center",
      paddingHorizontal: 80,
   },
   tempTaskText: {
      fontSize: 10,
      color: "#f11",
   },
});

export type TasksStyles = StyleSheet.NamedStyles<TasksStylesProps>;
