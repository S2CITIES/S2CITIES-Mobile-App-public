import React, { memo } from "react";
import {
   ScrollView,
   View as StandardView,
   TouchableOpacity,
   View as DefaultView,
   FlatList,
} from "react-native";
import { useAssignAlertModal } from "./index.hooks";
import { Modal } from "react-native";
import { AppButton } from "components/AppButton";
import { Text } from "components/Themed";
import Colors, {
   appPrimaryBlue,
   appSlightlyDarkerGrey,
} from "constants/Colors";
import Strings from "constants/Strings";
import Dimensions from "constants/Dimensions";
import { areUsersArraysEqual } from "utils/users";
import { AppCheckBox } from "components/AppCheckBox";

type AssignAlertModalProps = {};

export const AssignAlertModal = memo(({}: AssignAlertModalProps) => {
   const {
      styles,
      colorScheme,
      safeAreaFrame,
      modalProps,
      closeModal,
      originalUsersAssignments,
      currentUsersAssignments,
      setCurrentUsersAssignments,
   } = useAssignAlertModal();

   const {
      open,
      title,
      confirmCallback,
      rejectCallback,
      confirmLabel,
      rejectLabel,
      users,
   } = modalProps;

   return (
      <Modal
         animationType='slide'
         transparent={true}
         visible={open}
         onRequestClose={() => {
            closeModal();
         }}>
         <TouchableOpacity
            activeOpacity={1.0}
            onPress={() => {
               setCurrentUsersAssignments(originalUsersAssignments);
               closeModal();
            }}
            style={styles.overlayContainer}>
            <AppButton
               color={Colors[colorScheme].background}
               paddingHorizontal={Dimensions.modal.boxPaddingHorizontal}
               paddingVertical={Dimensions.modal.boxPaddingVertical}
               direction='column'>
               <Text
                  style={[
                     styles.title,
                     {
                        width: safeAreaFrame.width * (2.0 / 3.0),
                     },
                  ]}>
                  {title}
               </Text>

               <DefaultView
                  style={[
                     styles.usersList,
                     {
                        width: safeAreaFrame.width * (2.0 / 3.0),
                        maxHeight: safeAreaFrame.height * (1.0 / 3.0),
                     },
                  ]}>
                  <FlatList
                     data={currentUsersAssignments}
                     renderItem={({ item }) => {
                        return (
                           <DefaultView style={styles.userRow}>
                              <AppCheckBox
                                 color={Colors[colorScheme].defaultCheckbox}
                                 isChecked={item.selected ?? false}
                                 onPress={checked =>
                                    setCurrentUsersAssignments(
                                       currentUsersAssignments.map(u => {
                                          if (u.id === item.id)
                                             u.selected = checked;

                                          return u;
                                       })
                                    )
                                 }
                              />
                              <Text style={styles.userName}>
                                 {[item.first_name, item.last_name]
                                    .filter(x => !!x)
                                    .join(" ")}
                              </Text>
                           </DefaultView>
                        );
                     }}
                  />
               </DefaultView>

               <StandardView style={styles.buttonsRow}>
                  {/* reject button */}
                  <AppButton
                     title={
                        rejectLabel ?? Strings.en.modal_reject_default_label
                     }
                     flexGrow={1}
                     paddingVertical={Dimensions.modal.buttonPaddingVertical}
                     marginHorizontal={Dimensions.modal.buttonMarginHorizontal}
                     textStyle={styles.buttonText}
                     onPress={() => {
                        rejectCallback();
                        setCurrentUsersAssignments(originalUsersAssignments);
                        closeModal();
                     }}
                     color={appSlightlyDarkerGrey}
                     borderRadius={10}
                  />

                  {/* confirm button */}
                  <AppButton
                     title={
                        confirmLabel ?? Strings.en.modal_confirm_default_label
                     }
                     flexGrow={1}
                     paddingVertical={Dimensions.modal.buttonPaddingVertical}
                     marginHorizontal={Dimensions.modal.buttonMarginHorizontal}
                     textStyle={styles.buttonText}
                     onPress={() => {
                        const originalAssignedUsersIds =
                           originalUsersAssignments
                              .filter(user => user.selected ?? false)
                              .map(user => user.id);
                        const assignedUsersIds = currentUsersAssignments
                           .filter(user => user.selected ?? false)
                           .map(user => user.id);

                        // make call only if assigned users changed
                        if (
                           !areUsersArraysEqual(
                              originalAssignedUsersIds,
                              assignedUsersIds
                           )
                        ) {
                           confirmCallback(assignedUsersIds);
                        }

                        closeModal();
                     }}
                     color={appPrimaryBlue}
                     borderRadius={10}
                  />
               </StandardView>
            </AppButton>
         </TouchableOpacity>
      </Modal>
   );
});

AssignAlertModal.displayName = "AssignAlertModal";
