import React, { memo } from "react";
import { View as StandardView, TouchableOpacity } from "react-native";
import { useAppModal } from "./index.hooks";
import { Modal } from "react-native";
import { AppButton } from "components/AppButton";
import { Text } from "components/Themed";
import Colors, {
   appClear,
   appPrimaryBlue,
   appSlightlyDarkerGrey,
} from "constants/Colors";
import Strings from "constants/Strings";
import Dimensions from "constants/Dimensions";

type AppModalProps = {};

export const AppModal = memo(({}: AppModalProps) => {
   const { styles, colorScheme, safeAreaFrame, modalProps, closeModal } =
      useAppModal();

   const {
      open,
      title,
      confirmCallback,
      rejectCallback,
      confirmLabel,
      rejectLabel,
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
            onPress={() => closeModal()}
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
               <StandardView style={styles.buttonsRow}>
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
                        closeModal();
                     }}
                     color={appSlightlyDarkerGrey}
                     borderRadius={10}
                  />
                  <AppButton
                     title={
                        confirmLabel ?? Strings.en.modal_confirm_default_label
                     }
                     flexGrow={1}
                     paddingVertical={Dimensions.modal.buttonPaddingVertical}
                     marginHorizontal={Dimensions.modal.buttonMarginHorizontal}
                     textStyle={styles.buttonText}
                     onPress={() => {
                        confirmCallback();
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

AppModal.displayName = "AppModal";
