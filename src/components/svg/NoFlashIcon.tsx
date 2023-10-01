import React, { FC, memo } from "react";
import Colors from "../../constants/Colors";
import { SvgXml } from "react-native-svg";
import Dimensions from "constants/Dimensions";
import { useAppTheme } from "utils/ui";

type NoFlashIconProps = {
   color?: string;
   style?: React.ComponentProps<typeof SvgXml>["style"];
   size?: number;
};

const NoFlashIcon: FC<NoFlashIconProps> = memo(
   ({ color, style, size }: NoFlashIconProps) => {
      const colorScheme = useAppTheme();
      const _color = color ?? Colors[colorScheme].defaultIconColor;

      const svg = `
         <svg width="43" height="45" viewBox="0 0 43 45" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M11.4222 6.69349L8.15627 3.42754C8.87659 1.37941 10.8139 0 12.9963 0H23.5217C27.2053 0 29.6889 3.76641 28.2378 7.15218L25.1459 14.3668H33.9168C38.53 14.3668 40.7999 19.9805 37.4831 23.1869L32.6183 27.8896L29.7152 24.9864L34.63 20.2356C35.2934 19.5942 34.8394 18.4715 33.9168 18.4715H23.2002L20.2419 15.5131C20.275 15.3544 20.3246 15.1956 20.3922 15.0385L24.4649 5.53522C24.7551 4.85808 24.2585 4.10479 23.5217 4.10479H12.9963C12.5494 4.10479 12.1539 4.39399 12.0184 4.81984L11.4222 6.69349Z" fill="${_color}"/>
         <path d="M23.4909 31.0034L26.3938 33.9064L15.8353 44.1129C13.4191 46.4485 9.54221 43.7755 10.866 40.6866L16.8684 26.6811H7.77198C4.29931 26.6811 1.82961 23.3037 2.88254 19.9944L5.19961 12.7122L8.46741 15.98L6.7941 21.239C6.5835 21.9009 7.07745 22.5763 7.77198 22.5763H15.0637L20.6846 28.197L16.6462 37.62L23.4909 31.0034Z" fill="${_color}"/>
         <path d="M0.601125 2.06853C-0.200375 2.87003 -0.200375 4.16954 0.601125 4.97104L38.7311 43.1011C39.5326 43.9025 40.8322 43.9025 41.6336 43.1011C42.4353 42.2996 42.4353 41 41.6336 40.1986L3.50364 2.06853C2.70214 1.267 1.40263 1.267 0.601125 2.06853Z" fill="${_color}"/>
         </svg>
      `;

      const width = size ?? Dimensions.playIcon.defaultSize;
      const height = size ?? Dimensions.playIcon.defaultSize;

      return <SvgXml xml={svg} width={width} height={height} style={style} />;
   }
);

export default NoFlashIcon;
