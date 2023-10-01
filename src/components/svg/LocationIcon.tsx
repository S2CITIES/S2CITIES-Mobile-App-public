import React, { FC, memo } from "react";
import Colors from "../../constants/Colors";
import { SvgXml } from "react-native-svg";
import Dimensions from "constants/Dimensions";
import { useAppTheme } from "utils/ui";

type LocationIconProps = {
   color?: string;
   style?: React.ComponentProps<typeof SvgXml>["style"];
};

const LocationIcon: FC<LocationIconProps> = memo(
   ({ color, style }: LocationIconProps) => {
      const colorScheme = useAppTheme();
      const _color = color ?? Colors[colorScheme].defaultIconColor;

      const svg = `
         <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M20.01 19.0999C21.584 19.0999 22.8599 17.824 22.8599 16.25C22.8599 14.6759 21.584 13.4 20.01 13.4C18.4359 13.4 17.16 14.6759 17.16 16.25C17.16 17.824 18.4359 19.0999 20.01 19.0999Z" fill="${_color}"/>
         <path d="M20.2 2C16.1949 1.9998 12.3516 3.58034 9.50535 6.39809C6.65913 9.21584 5.04005 13.0431 5 17.048C5 27.4599 18.395 39.0499 18.965 39.5439C19.3091 39.8382 19.7471 40 20.2 40C20.6528 40 21.0908 39.8382 21.4349 39.5439C22.0999 39.0499 35.3999 27.4599 35.3999 17.048C35.3599 13.0431 33.7408 9.21584 30.8946 6.39809C28.0483 3.58034 24.205 1.9998 20.2 2ZM20.2 22.8999C18.8847 22.8999 17.599 22.5099 16.5054 21.7792C15.4118 21.0485 14.5595 20.0099 14.0562 18.7948C13.5529 17.5797 13.4212 16.2426 13.6777 14.9526C13.9343 13.6626 14.5677 12.4777 15.4977 11.5477C16.4277 10.6177 17.6126 9.98434 18.9026 9.72775C20.1926 9.47116 21.5297 9.60285 22.7448 10.1062C23.9599 10.6095 24.9985 11.4618 25.7292 12.5554C26.4599 13.649 26.8499 14.9347 26.8499 16.25C26.8499 18.0136 26.1493 19.7051 24.9022 20.9522C23.6551 22.1993 21.9636 22.8999 20.2 22.8999V22.8999Z" fill="${_color}"/>
         </svg>

      `;

      const width = Dimensions.alertDetail.alertAddressIconSize;
      const height = Dimensions.alertDetail.alertAddressIconSize;

      return <SvgXml xml={svg} width={width} height={height} style={style} />;
   }
);

export default LocationIcon;
