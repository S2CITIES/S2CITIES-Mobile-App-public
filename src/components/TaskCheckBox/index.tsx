import React, { memo } from "react";
import { View as DefaultView, Text as DefaultText } from "react-native";
import { useTaskCheckBox } from "./index.hooks";
import { Alert } from "models";
import { alertLabelOfType, checkableAlertColorOf } from "utils";
import { AppButton } from "components/AppButton";
import Dimensions from "constants/Dimensions";
import Colors from "constants/Colors";
import { Text, View } from "components/Themed";
import { AppCheckBox } from "components/AppCheckBox";

type TaskCheckBoxProps = {
   task: Alert;
   goToAlertDetail: () => void;
};

export const TaskCheckBox = memo(
   ({ task, goToAlertDetail }: TaskCheckBoxProps) => {
      const { styles, colorScheme, checkTask, isTaskActionLoading } =
         useTaskCheckBox(task._id ?? "");

      const { type, cam, check } = task;
      const isTaskChecked = check?.marked ?? false;

      const shortAddress = task.getShortAddress();
      const localTime = task.getLocalTime();
      const alertColor = checkableAlertColorOf(task, colorScheme);

      return (
         <DefaultView style={styles.taskBox}>
            <AppCheckBox
               isChecked={isTaskChecked}
               onPress={checked => checkTask(checked)}
               isActionLoading={isTaskActionLoading}
               color={Colors[colorScheme].defaultCheckbox}
            />
            <AppButton
               onPress={goToAlertDetail}
               marginHorizontal={0}
               marginVertical={0}
               paddingHorizontal={Dimensions.smallAlertCard.paddingHorizontal}
               paddingVertical={Dimensions.smallAlertCard.paddingVertical}
               color={alertColor}
               offset={[2.6, 2.7]}
               distance={3}>
               <View style={styles.alertCardContentBox}>
                  <View style={styles.alertInfoColumn}>
                     <Text
                        style={[
                           styles.alertInfoTitle,
                           {
                              color: Colors[colorScheme].buttonDefaultTextColor,
                           },
                        ]}>
                        <DefaultText style={styles.bold}>
                           {alertLabelOfType(type)}
                        </DefaultText>
                        {cam && ` - Cam ${cam}`}
                     </Text>
                     <Text
                        style={[
                           styles.alertInfoAddress,
                           {
                              color: Colors[colorScheme].buttonDefaultTextColor,
                           },
                        ]}>
                        {shortAddress}
                     </Text>
                  </View>

                  <Text
                     style={[
                        styles.timeColumn,
                        { color: Colors[colorScheme].buttonDefaultTextColor },
                     ]}>
                     {localTime}
                  </Text>
               </View>
            </AppButton>
         </DefaultView>
      );
   }
);

TaskCheckBox.displayName = "TaskCheckBox";
