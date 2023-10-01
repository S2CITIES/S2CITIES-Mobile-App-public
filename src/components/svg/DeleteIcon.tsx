import React, { FC, memo } from "react";
import Colors from "../../constants/Colors";
import { SvgXml } from "react-native-svg";
import Dimensions from "constants/Dimensions";
import { useAppTheme } from "utils/ui";

type DeleteIconProps = {
   color?: string;
   style?: React.ComponentProps<typeof SvgXml>["style"];
   size?: number;
};

const DeleteIcon: FC<DeleteIconProps> = memo(
   ({ color, style, size }: DeleteIconProps) => {
      const colorScheme = useAppTheme();
      const _color = color ?? Colors[colorScheme].defaultIconColor;

      const svg = `
      <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.44875 41.1368L4.5 13.5H40.5L36.5513 41.1368C36.398 42.2091 35.8631 43.1901 35.0447 43.8997C34.2263 44.6094 33.1795 45.0001 32.0962 45H12.9038C11.8205 45.0001 10.7737 44.6094 9.9553 43.8997C9.13694 43.1901 8.60202 42.2091 8.44875 41.1368ZM42.75 4.5H31.5V2.25C31.5 1.65326 31.2629 1.08097 30.841 0.65901C30.419 0.237053 29.8467 0 29.25 0H15.75C15.1533 0 14.581 0.237053 14.159 0.65901C13.7371 1.08097 13.5 1.65326 13.5 2.25V4.5H2.25C1.65326 4.5 1.08097 4.73705 0.65901 5.15901C0.237053 5.58097 0 6.15326 0 6.75C0 7.34674 0.237053 7.91903 0.65901 8.34099C1.08097 8.76295 1.65326 9 2.25 9H42.75C43.3467 9 43.919 8.76295 44.341 8.34099C44.7629 7.91903 45 7.34674 45 6.75C45 6.15326 44.7629 5.58097 44.341 5.15901C43.919 4.73705 43.3467 4.5 42.75 4.5Z" fill="${_color}"/>
      </svg>
   `;

      const width = size ?? Dimensions.playIcon.defaultSize;
      const height = size ?? Dimensions.playIcon.defaultSize;

      return <SvgXml xml={svg} width={width} height={height} style={style} />;
   }
);

export default DeleteIcon;
