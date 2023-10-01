import React, { FC, memo } from "react";
import Colors from "../../constants/Colors";
import { SvgXml } from "react-native-svg";
import Dimensions from "constants/Dimensions";
import { useAppTheme } from "utils/ui";

type VideoErrorIconProps = {
   color?: string;
   style?: React.ComponentProps<typeof SvgXml>["style"];
};

const VideoErrorIcon: FC<VideoErrorIconProps> = memo(
   ({ color, style }: VideoErrorIconProps) => {
      const colorScheme = useAppTheme();
      const _color = color ?? Colors[colorScheme].defaultIconColor;

      const svg = `
         <svg width="51" height="35" viewBox="0 0 51 35" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M5.75 0.75H33.25C36 0.75 38.25 3 38.25 5.75V25.75C38.25 28.5 36 30.75 33.25 30.75H5.75C3 30.75 0.75 28.5 0.75 25.75V5.75C0.75 3 3 0.75 5.75 0.75Z" fill="${_color}"/>
         <path d="M50.75 29.5L38.25 22V9.5L50.75 2V29.5Z" fill="${_color}"/>
         <path fill-rule="evenodd" clip-rule="evenodd" d="M28.5 35C35.4037 35 41 29.4037 41 22.5C41 15.5963 35.4037 10 28.5 10C21.5963 10 16 15.5963 16 22.5C16 29.4037 21.5963 35 28.5 35ZM26.625 28.7387C26.625 27.655 27.4488 26.875 28.4888 26.875C29.5513 26.875 30.375 27.655 30.375 28.7387C30.375 29.8225 29.5513 30.625 28.4888 30.625C27.4488 30.625 26.625 29.8225 26.625 28.7387ZM27.465 15C27.3807 15.0001 27.2972 15.0172 27.2197 15.0504C27.1422 15.0836 27.0721 15.1322 27.0139 15.1931C26.9556 15.2541 26.9102 15.3262 26.8806 15.4052C26.8509 15.4841 26.8375 15.5682 26.8413 15.6525L27.2238 24.4025C27.2308 24.5634 27.2998 24.7154 27.4163 24.8268C27.5327 24.9381 27.6876 25.0002 27.8488 25H29.1525C29.3136 25.0002 29.4685 24.9381 29.585 24.8268C29.7014 24.7154 29.7704 24.5634 29.7775 24.4025L30.1587 15.6525C30.1625 15.5681 30.149 15.4839 30.1193 15.4049C30.0896 15.3258 30.0441 15.2537 29.9857 15.1927C29.9273 15.1317 29.8571 15.0832 29.7795 15.0501C29.7018 15.0169 29.6182 14.9999 29.5337 15H27.465Z" fill="#480000"/>
         </svg>
      `;

      const width = Dimensions.playIcon.defaultSize;
      const height = Dimensions.playIcon.defaultSize;

      return <SvgXml xml={svg} width={width} height={height} style={style} />;
   }
);

export default VideoErrorIcon;
