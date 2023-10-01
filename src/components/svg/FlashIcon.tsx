import React, { FC, memo } from "react";
import Colors from "../../constants/Colors";
import { SvgXml } from "react-native-svg";
import Dimensions from "constants/Dimensions";
import { useAppTheme } from "utils/ui";

type FlashIconProps = {
   color?: string;
   style?: React.ComponentProps<typeof SvgXml>["style"];
   size?: number;
};

const FlashIcon: FC<FlashIconProps> = memo(
   ({ color, style, size }: FlashIconProps) => {
      const colorScheme = useAppTheme();
      const _color = color ?? Colors[colorScheme].defaultIconColor;

      const svg = `
         <svg width="37" height="45" viewBox="0 0 37 45" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path fill-rule="evenodd" clip-rule="evenodd" d="M5.46948 3.57525C6.14697 1.44601 8.1245 0 10.3589 0H20.8843C24.568 0 27.0516 3.76641 25.6005 7.15218L22.5086 14.3668H31.2795C35.8927 14.3668 38.1626 19.9805 34.8455 23.1869L13.198 44.1129C10.7818 46.4485 6.90488 43.7755 8.22866 40.6866L14.231 26.6811H5.13465C1.66198 26.6811 -0.807724 23.3037 0.245215 19.9944L5.46948 3.57525ZM10.3589 4.10479C9.91205 4.10479 9.51653 4.39399 9.38103 4.81984L4.15677 21.239C3.94617 21.9009 4.44012 22.5763 5.13465 22.5763H16.721C18.4892 22.5763 19.6812 24.3843 18.9848 26.0094L14.0088 37.62L31.9927 20.2356C32.656 19.5942 32.202 18.4715 31.2795 18.4715H20.0184C18.2503 18.4715 17.0583 16.6637 17.7548 15.0385L21.8276 5.53522C22.1178 4.85808 21.6211 4.10479 20.8843 4.10479H10.3589Z" fill="${_color}"/>
         </svg>
      `;

      const width = size ?? Dimensions.playIcon.defaultSize;
      const height = size ?? Dimensions.playIcon.defaultSize;

      return <SvgXml xml={svg} width={width} height={height} style={style} />;
   }
);

export default FlashIcon;
