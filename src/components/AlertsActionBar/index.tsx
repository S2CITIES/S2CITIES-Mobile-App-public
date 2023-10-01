import React, { FC, memo } from "react";
import { useAlertsHeader as useAlertsActionBar } from "./index.hooks";
import { MainActionBar } from "components/MainHeader";
import { AppButton } from "components/AppButton";
import PlusIcon from "components/svg/PlusIcon";
import Colors from "constants/Colors";
import Strings from "constants/Strings";
import { Select, CheckIcon, ChevronDownIcon, ChevronUpIcon } from "native-base";
import Dimensions from "constants/Dimensions";

type AlertsActionBarProps = {
   filter: string;
   setFilter: (filter: string) => void;
   navigateToAddAlert: () => void;
};

export const AlertsActionBar: FC<AlertsActionBarProps> = memo(
   ({ filter, setFilter, navigateToAddAlert }: AlertsActionBarProps) => {
      const { styles, colorScheme } = useAlertsActionBar();

      return (
         <MainActionBar style={styles.mainHeader}>
            <Select
               selectedValue={filter}
               flex={1}
               display={"flex"}
               flexDirection={"row"}
               flexWrap={"nowrap"}
               alignItems={"center"}
               borderWidth={0}
               paddingLeft={8}
               fontFamily={"lato-black"}
               fontSize={Dimensions.alertsHeader.filterLabelSize}
               color={Colors[colorScheme].text}
               dropdownIcon={<ChevronDownIcon size={5} position='absolute' />}
               dropdownOpenIcon={<ChevronUpIcon size={5} position='absolute' />}
               _selectedItem={{
                  startIcon: <CheckIcon size={6} />,
               }}
               onValueChange={itemValue => setFilter(itemValue)}>
               <Select.Item label={Strings.en.alerts_filter_all} value='All' />
               <Select.Item
                  label={Strings.en.alerts_filter_hand_signal_alert}
                  value='HandSignalAlert'
               />
               <Select.Item
                  label={Strings.en.alerts_filter_generic_alert}
                  value='GenericAlert'
               />
               <Select.Item
                  label={Strings.en.alerts_filter_emergency_alert}
                  value='EmergencyAlert'
               />
            </Select>

            <AppButton
               onPress={() => navigateToAddAlert()}
               paddingHorizontal={styles.addButton.paddingHorizontal}
               paddingVertical={styles.addButton.paddingVertical}
               marginHorizontal={0}
               flexGrow={0}
               color={Colors[colorScheme].genericAlert}>
               <PlusIcon />
            </AppButton>
         </MainActionBar>
      );
   }
);

AlertsActionBar.displayName = "AlertsActionBar";
