import React, { memo, useState } from "react";
import { View as DefaultView, Switch } from "react-native";
import { useSettings } from "./index.hooks";
import { LineSeparator, SettingsItem, Text } from "components";
import { ScrollView } from "native-base";
import Strings from "constants/Strings";
import { SettingsStackScreenProps } from "../../../types";
import { actions } from "redux-store";
import { appPrimaryBlue } from "constants/Colors";
import Colors from "constants/Colors";

type SettingsProps = {} & SettingsStackScreenProps<"SettingsList">;

export const Settings = memo(({ navigation }: SettingsProps) => {
   const { styles, dispatch, colorScheme, useSystemTheme, setUseSystemTheme } =
      useSettings();

   return (
      <ScrollView>
         <DefaultView style={styles.mainContainer}>
            <LineSeparator
               label='Profile'
               style={{ marginStart: 0, marginEnd: 50 }}
            />

            <SettingsItem
               title={Strings.en.logout}
               onPress={() =>
                  dispatch(
                     actions.openModal({
                        title: Strings.en.logout_alert_modal_message,
                        rejectCallback: () => {},
                        confirmCallback: () => {
                           navigation.getParent().reset({
                              index: 0,
                              routes: [{ name: "Cover" }],
                           });
                        },
                        confirmLabel: "Yes",
                        rejectLabel: "No",
                     })
                  )
               }
            />

            <LineSeparator
               label='General'
               style={{ marginTop: 10, marginStart: 0, marginEnd: 50 }}
            />
            <SettingsItem title={Strings.en.settings_use_system_theme}>
               <Switch
                  trackColor={{
                     false: Colors[colorScheme].settingsJustDarkModeOffColor,
                     true: Colors[colorScheme].settingsJustDarkModeOnColor,
                  }}
                  thumbColor={appPrimaryBlue}
                  ios_backgroundColor={
                     Colors[colorScheme].settingsJustDarkModeOffColor
                  }
                  onValueChange={newValue => setUseSystemTheme(newValue)}
                  value={useSystemTheme}
                  style={{ marginEnd: -15 }}
               />
            </SettingsItem>
         </DefaultView>
      </ScrollView>
   );
});

Settings.displayName = "Settings";
