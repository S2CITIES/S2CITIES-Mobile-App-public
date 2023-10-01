import React, { memo } from "react";
import { ColorSchemeName, Image, TouchableOpacity, View } from "react-native";
import { useAlertActionButton } from "./index.hooks";
import Colors, { white } from "constants/Colors";
import { ActionButtonState, AlertAction, AlertActionType, User } from "models";
import AlertActionIcon from "components/svg/AlertActionIcon";
import { Text } from "components/Themed";
import { Assets } from "utils/resources";
import Dimensions from "constants/Dimensions";
import { actions } from "redux-store";
import Strings from "constants/Strings";

type AlertActionButtonProps = {
   action: AlertAction;
   width: number;
   colorScheme: ColorSchemeName;
   state: ActionButtonState;
   alertColor: string;
   alertId: string;
   assignableUsers: User[];
   lastTappedAction?: AlertActionType;
   setLastTappedAction?: (actionType: AlertActionType) => void;
};

export const AlertActionButton = memo(
   ({
      action,
      width,
      colorScheme,
      state,
      alertColor,
      alertId,
      assignableUsers,
      lastTappedAction,
      setLastTappedAction,
   }: AlertActionButtonProps) => {
      const { styles, dispatch, loading } = useAlertActionButton(
         alertId,
         action.type,
         lastTappedAction
      );

      const iconColor =
         state === ActionButtonState.disabled
            ? Colors[colorScheme].alertActionDisabledIconColor
            : /* alertColor !== Colors[colorScheme].genericAlert && */
            state === ActionButtonState.checked
            ? white
            : Colors[colorScheme].alertActionIconColor;

      const labelColor =
         state === ActionButtonState.disabled
            ? Colors[colorScheme].alertActionDisabledLabelColor
            : /* alertColor !== Colors[colorScheme].genericAlert && */
            state === ActionButtonState.checked
            ? white
            : Colors[colorScheme].alertActionLabelColor;

      const buttonColor =
         state === ActionButtonState.disabled
            ? Colors[colorScheme].alertActionButtonColor
            : state === ActionButtonState.checked
            ? alertColor
            : Colors[colorScheme].alertActionButtonColor;

      const buttonOpacity =
         state === ActionButtonState.disabled || loading ? 1.0 : 0.6;

      return (
         <TouchableOpacity
            activeOpacity={buttonOpacity}
            onPress={() => {
               if (!state || state === ActionButtonState.disabled || loading)
                  return; // no actions during loading or when button is disabled

               if (action.type === AlertActionType.assign) {
                  setLastTappedAction(action.type);

                  // open assign alert modal
                  dispatch(
                     actions.openAssignAlertModal({
                        title: action.modalTitle(state) /* TODO */,
                        rejectCallback: () => {},
                        confirmCallback: assignedUsersIds => {
                           // call API to assign users to the alert
                           dispatch(
                              actions.patchAlertsById.request({
                                 id: alertId,
                                 assigned_users: assignedUsersIds,
                              })
                           );
                        },
                        confirmLabel: Strings.en.alert_action_assign,
                        rejectLabel: Strings.en.cancel,
                        users: assignableUsers.map(u => new User(u)), // duplicate users array
                        currentUsersAssignments: assignableUsers.map(
                           u => new User(u)
                        ), // duplicate users array
                     })
                  );
               } else {
                  // open modal to let user confirm their choice
                  dispatch(
                     actions.openModal({
                        title: action.modalTitle(state),
                        rejectCallback: () => {},
                        confirmCallback: () => {
                           setLastTappedAction(action.type);

                           dispatch(
                              action.reduxTapAction(state, alertId, actions)
                           );
                        },
                     })
                  );
               }
            }}>
            <View
               style={[
                  styles.buttonContainer,
                  {
                     width: width,
                     backgroundColor: buttonColor,
                  },
               ]}>
               {state !== ActionButtonState.disabled && loading ? (
                  <Image
                     style={{
                        margin: Dimensions.alertDetail.alertActionLoadingMargin,
                        width: Dimensions.alertDetail.alertActionLoadingSize,
                        height: Dimensions.alertDetail.alertActionLoadingSize,
                     }}
                     source={Assets.gif.loadingIndicator}
                  />
               ) : (
                  <AlertActionIcon
                     icon={action.type}
                     color={iconColor}
                     style={[
                        styles.iconBox,
                        action.type === AlertActionType.assign && {
                           marginLeft: 11,
                        },
                     ]}
                  />
               )}
               <Text style={[styles.actionLabel, { color: labelColor }]}>
                  {action.label ?? ""}
               </Text>
            </View>
         </TouchableOpacity>
      );
   }
);

AlertActionButton.displayName = "AlertActionButton";
