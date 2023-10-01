import React, { memo } from "react";
import {
   View,
   Text,
   SmallAlertCard,
   LineSeparator,
   AlertsActionBar,
   AppCheckBox,
} from "components";
import { useAlerts } from "./index.hooks";
import { AlertsStackScreenProps } from "../../../types";
import {
   SectionList,
   View as DefaultView,
   TouchableOpacity,
} from "react-native";
import { formattedDateOf } from "utils";
import { actions } from "redux-store";
import { AlertType } from "models";
import Colors from "constants/Colors";

type AlertsProps = {} & AlertsStackScreenProps<"AlertsList">;

export const Alerts = memo(({ navigation }: AlertsProps) => {
   const {
      styles,
      colorScheme,
      allFilteredAlerts,
      groupedFilteredAlerts,
      areAlertsLoading,
      dispatch,
      filter,
      setFilter,
      onlyUncheckedFilter,
      setOnlyUncheckedFilter,
   } = useAlerts();

   return (
      <View style={styles.mainContainer}>
         <AlertsActionBar
            filter={filter}
            setFilter={setFilter}
            navigateToAddAlert={() =>
               navigation.navigate("AddAlert", {
                  type: AlertType.GenericAlert,
               })
            }
         />

         {(allFilteredAlerts.length > 0 || areAlertsLoading) && (
            <SectionList
               sections={groupedFilteredAlerts}
               keyExtractor={item => item._id}
               renderItem={({ item }) => (
                  <SmallAlertCard
                     alert={item}
                     goToAlertDetail={() =>
                        navigation.navigate("AlertDetail", item.toHeaderInfo())
                     }
                  />
               )}
               renderSectionHeader={({ section }) => {
                  const formattedDate = formattedDateOf(
                     section.data[0].timestamp
                  );
                  return <LineSeparator label={formattedDate} />;
               }}
               stickySectionHeadersEnabled={false}
               contentContainerStyle={styles.alertsSectionList}
               refreshing={areAlertsLoading}
               onRefresh={() => {
                  // update alerts
                  dispatch(actions.getAlerts.request({}));

                  // update zones
                  dispatch(actions.getZones.request({}));

                  // update users
                  dispatch(actions.getUsers.request({}));
               }}
            />
         )}

         {!areAlertsLoading && allFilteredAlerts.length === 0 && (
            <Text style={styles.placeholderText}>No alerts</Text>
         )}

         <TouchableOpacity
            style={styles.uncheckedFilterCheckboxWrapper}
            activeOpacity={0.6}
            onPress={() => {}}>
            <Text
               style={[
                  styles.uncheckedFilterLabel,
                  { color: Colors[colorScheme].defaultCheckbox },
               ]}>
               {"Unchecked\nalerts"}
            </Text>
            <AppCheckBox
               isChecked={onlyUncheckedFilter}
               onPress={checked => setOnlyUncheckedFilter(checked)}
               size={38}
               borderWidth={4}
               offsetEnd={-16}
               padding={10}
            />
         </TouchableOpacity>
      </View>
   );
});

Alerts.displayName = "Alerts";
