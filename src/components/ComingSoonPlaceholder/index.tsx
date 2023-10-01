import React, { memo } from "react";
import { View } from "react-native";
import { styles } from "./styles";
import { Text } from "components/Themed";
type ComingSoonPlaceholderProps = {};

export const ComingSoonPlaceholder = memo(({}: ComingSoonPlaceholderProps) => {
   return (
      <View style={styles.comingSoon}>
         <Text style={styles.comingSoonText}>⚠️</Text>
         <Text style={styles.comingSoonText}>Coming Soon</Text>
      </View>
   );
});

ComingSoonPlaceholder.displayName = "ComingSoonPlaceholder";
