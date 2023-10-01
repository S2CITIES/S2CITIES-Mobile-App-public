import React, { FC, memo } from "react";
import Colors from "../../constants/Colors";
import { SvgXml } from "react-native-svg";
import Dimensions from "constants/Dimensions";
import { useAppTheme } from "utils/ui";

type NoVideoIconProps = {
   color?: string;
   style?: React.ComponentProps<typeof SvgXml>["style"];
};

const NoVideoIcon: FC<NoVideoIconProps> = memo(
   ({ color, style }: NoVideoIconProps) => {
      const colorScheme = useAppTheme();
      const _color = color ?? Colors[colorScheme].defaultIconColor;

      const svg = `
         <svg width="55" height="52" viewBox="0 0 55 52" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M10 11H37.5C40.25 11 42.5 13.25 42.5 16V36C42.5 38.75 40.25 41 37.5 41H10C7.25 41 5 38.75 5 36V16C5 13.25 7.25 11 10 11Z" fill="${_color}"/>
         <path d="M55 39.75L42.5 32.25V19.75L55 12.25V39.75Z" fill="${_color}"/>
         <path d="M0.25 2.25L47.75 49.75" stroke="#480000" stroke-width="5" stroke-miterlimit="10" stroke-linejoin="round"/>
         </svg>
      `;

      const width = Dimensions.playIcon.defaultSize;
      const height = Dimensions.playIcon.defaultSize;

      return <SvgXml xml={svg} width={width} height={height} style={style} />;
   }
);

export default NoVideoIcon;
