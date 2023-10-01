import Dimensions from "constants/Dimensions";
import { StyleSheet } from "react-native";

type BigAlertCardStylesProps = {
   bigCard;
};

export const styles: BigAlertCardStyles = StyleSheet.create({
   bigCard: {
      marginHorizontal: Dimensions.smallAlertCard.marginHorizontal,
      marginVertical: Dimensions.smallAlertCard.marginVertical + 3,
   },
});

export type BigAlertCardStyles =
   StyleSheet.NamedStyles<BigAlertCardStylesProps>;
