import React, { FC, memo } from "react";
import Colors from "../../constants/Colors";
import { SvgXml } from "react-native-svg";
import Dimensions from "constants/Dimensions";
import { useAppTheme } from "utils/ui";

type FlipCameraIconProps = {
   color?: string;
   style?: React.ComponentProps<typeof SvgXml>["style"];
   size?: number;
};

const FlipCameraIcon: FC<FlipCameraIconProps> = memo(
   ({ color, style, size }: FlipCameraIconProps) => {
      const colorScheme = useAppTheme();
      const _color = color ?? Colors[colorScheme].defaultIconColor;

      const svg = `
         <svg width="45" height="41" viewBox="0 0 45 41" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path fill-rule="evenodd" clip-rule="evenodd" d="M27.4999 40.5H17.5C10.4777 40.5 6.96654 40.5 4.44429 38.8454C3.35239 38.129 2.41488 37.2085 1.6853 36.1366C2.14577e-07 33.6602 0 30.2128 0 23.3181C0 16.4237 2.14577e-07 12.9762 1.6853 10.4998C2.41488 9.42781 3.35239 8.50734 4.44429 7.79103C6.06499 6.72779 8.09399 6.34777 11.2005 6.21193C12.6829 6.21193 13.9593 5.10903 14.25 3.68181C14.6861 1.541 16.6006 0 18.8242 0H26.1758C28.3993 0 30.3138 1.541 30.7501 3.68181C31.0408 5.10903 32.317 6.21193 33.7995 6.21193C36.9061 6.34777 38.9349 6.72779 40.5558 7.79103C41.6475 8.50734 42.5851 9.42781 43.3147 10.4998C45 12.9762 45 16.4237 45 23.3181C45 30.2128 45 33.6602 43.3147 36.1366C42.5851 37.2085 41.6475 38.129 40.5558 38.8454C38.0335 40.5 34.5224 40.5 27.4999 40.5ZM29.8568 14.8491C29.8568 13.9171 29.1013 13.1616 28.1693 13.1616C27.2374 13.1616 26.4818 13.9171 26.4818 14.8491V15.1721C23.1741 13.4969 19.0307 14.0415 16.2664 16.8057C12.824 20.2482 12.824 25.8295 16.2664 29.272C19.7089 32.7143 25.2902 32.7143 28.7325 29.272C30.1973 27.8073 31.0403 25.9508 31.2577 24.0399C31.363 23.1138 30.6976 22.2777 29.7718 22.1724C28.8457 22.0671 28.0096 22.7324 27.9043 23.6583C27.77 24.8382 27.252 25.9796 26.3461 26.8855C24.2217 29.0099 20.7774 29.0099 18.6529 26.8855C16.5285 24.761 16.5285 21.3167 18.6529 19.1923C20.1103 17.7349 22.1888 17.2773 24.0363 17.8195C23.3408 18.1433 22.9338 18.9137 23.0987 19.6969C23.2909 20.6089 24.1857 21.1925 25.0979 21.0004L28.5172 20.2804C29.2979 20.1159 29.8568 19.427 29.8568 18.6291V14.8491Z" fill="${_color}"/>
         </svg>
      `;

      const width = size ?? Dimensions.playIcon.defaultSize;
      const height = size ?? Dimensions.playIcon.defaultSize;

      return <SvgXml xml={svg} width={width} height={height} style={style} />;
   }
);

export default FlipCameraIcon;
