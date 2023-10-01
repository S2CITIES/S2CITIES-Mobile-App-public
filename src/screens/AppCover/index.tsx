import React, { memo } from "react";
import { View as DefaultView, Image } from "react-native";
import { useAppCover } from "./index.hooks";
import { Assets } from "utils/resources";
import { AppButton, Text } from "components";
import Strings from "constants/Strings";
import { RootStackScreenProps } from "../../../types";
import S2citiesLogoIcon from "components/svg/S2citiesLogoIcon";
import Dimensions from "constants/Dimensions";
import { useNotificationListenerToNavigateToRoot } from "utils/pushNotifications";

type AppCoverProps = {} & RootStackScreenProps<"Cover">;

export const AppCover = memo(({ navigation }: AppCoverProps) => {
   const { styles, window } = useAppCover();

   const logoWidth = window.width - 80;
   const logoHeight = logoWidth / Dimensions.s2citiesLogo.aspectRatio;

   const mottoMarginTop = window.height / 35;
   const mottoMarginBottom = mottoMarginTop * 3.5;

   useNotificationListenerToNavigateToRoot(navigation);

   return (
      <DefaultView>
         <Image
            source={Assets.images.signInCover}
            resizeMode={"cover"}
            style={{
               width: window.width,
               height: window.height,
               position: "absolute",
            }}
         />
         <DefaultView style={styles.mainContainer}>
            <S2citiesLogoIcon width={logoWidth} height={logoHeight} />
            <Text
               style={[
                  styles.mottoText,
                  {
                     marginTop: mottoMarginTop,
                     marginBottom: mottoMarginBottom,
                  },
               ]}>
               {Strings.en.cover_s2cities_motto}
            </Text>
            <DefaultView style={styles.buttonWrapper}>
               <AppButton
                  title={Strings.en.cover_sign_in}
                  onPress={() => {
                     navigation.navigate("Login");
                  }}
                  textStyle={styles.signInButtonText}
                  paddingVertical={20}
                  flexGrow={1}
                  distance={3}
                  offset={[1.3, 2.0]}
                  startColor='#00000066'
                  borderRadius={20}
               />
            </DefaultView>
         </DefaultView>
      </DefaultView>
   );
});

AppCover.displayName = "AppCover";
