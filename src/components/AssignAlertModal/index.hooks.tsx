import { useDispatch, useSelector } from "react-redux";
import { styles } from "./styles";
import { actions, selectors } from "redux-store";
import { useSafeAreaFrame } from "react-native-safe-area-context";
import { useAppTheme } from "utils/ui";
import { useEffect, useState } from "react";
import { User } from "models";

export const useAssignAlertModal = () => {
   const modalProps = useSelector(selectors.getAssignAlertModal);
   const dispatch = useDispatch();
   const colorScheme = useAppTheme();
   const safeAreaFrame = useSafeAreaFrame();

   const originalUsersAssignments = modalProps.users;
   const currentUsersAssignments = modalProps.currentUsersAssignments;

   const setCurrentUsersAssignments = (users: User[]) => {
      dispatch(
         actions.setAlertAssignments({
            currentUsersAssignments: users,
         })
      );
   };

   const closeModal = () => {
      dispatch(actions.closeAssignAlertModal());
   };

   return {
      styles,
      colorScheme,
      safeAreaFrame,
      modalProps,
      closeModal,
      originalUsersAssignments,
      currentUsersAssignments,
      setCurrentUsersAssignments,
   };
};
