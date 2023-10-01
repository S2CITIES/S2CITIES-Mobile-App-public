import React, { FC, memo } from "react";
import Colors from "../../constants/Colors";
import { SvgXml } from "react-native-svg";
import Dimensions from "constants/Dimensions";
import { useAppTheme } from "utils/ui";

type StopIconProps = {
   color?: string;
   style?: React.ComponentProps<typeof SvgXml>["style"];
};

const StopIcon: FC<StopIconProps> = memo(({ color, style }: StopIconProps) => {
   const colorScheme = useAppTheme();
   const _color = color ?? Colors[colorScheme].defaultIconColor;

   const svg = `
      <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M22.5 45C34.9263 45 45 34.9263 45 22.5C45 10.0736 34.9263 0 22.5 0C10.0736 0 0 10.0736 0 22.5C0 34.9263 10.0736 45 22.5 45ZM14.818 14.818C13.5 16.136 13.5 18.2574 13.5 22.5C13.5 26.7426 13.5 28.8639 14.818 30.1819C16.136 31.5 18.2574 31.5 22.5 31.5C26.7426 31.5 28.8639 31.5 30.1819 30.1819C31.5 28.8639 31.5 26.7426 31.5 22.5C31.5 18.2574 31.5 16.136 30.1819 14.818C28.8639 13.5 26.7426 13.5 22.5 13.5C18.2574 13.5 16.136 13.5 14.818 14.818Z" fill="${_color}"/>
      </svg>
   `;

   const width = Dimensions.playIcon.defaultSize;
   const height = Dimensions.playIcon.defaultSize;

   return <SvgXml xml={svg} width={width} height={height} style={style} />;
});

export default StopIcon;
