import React, { FC, memo } from "react";
import Colors from "../../constants/Colors";
import { SvgXml } from "react-native-svg";
import Dimensions from "constants/Dimensions";
import { useAppTheme } from "utils/ui";

type PlayIconProps = {
   color?: string;
   style?: React.ComponentProps<typeof SvgXml>["style"];
};

const PlayIcon: FC<PlayIconProps> = memo(({ color, style }: PlayIconProps) => {
   const colorScheme = useAppTheme();
   const _color = color ?? Colors[colorScheme].defaultIconColor;

   const svg = `
      <svg width="31" height="44" viewBox="0 0 31 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.75023 43.1485C5.6687 43.1418 4.60072 42.8968 3.61619 42.4294C2.5514 41.9394 1.64421 41.1398 1.00297 40.1261C0.361729 39.1125 0.0135454 37.9275 0 36.7128V6.43989C0.0135454 5.22518 0.361729 4.04022 1.00297 3.02652C1.64421 2.01283 2.5514 1.21324 3.61619 0.72327C4.84137 0.119133 6.20447 -0.113556 7.55016 0.0517189C8.89585 0.216993 10.17 0.773584 11.2274 1.65806L28.7918 16.7945C29.4806 17.367 30.0368 18.0942 30.4191 18.9221C30.8014 19.75 31 20.6572 31 21.5763C31 22.4954 30.8014 23.4027 30.4191 24.2306C30.0368 25.0585 29.4806 25.7857 28.7918 26.3582L11.2274 41.4946C9.96134 42.5665 8.38031 43.1505 6.75023 43.1485ZM6.75023 7.19491V35.5982L23.488 21.5763L6.75023 7.19491Z" fill="${_color}"/>
      </svg>
   `;

   const width = Dimensions.playIcon.defaultSize;
   const height = Dimensions.playIcon.defaultSize;

   return <SvgXml xml={svg} width={width} height={height} style={style} />;
});

export default PlayIcon;
