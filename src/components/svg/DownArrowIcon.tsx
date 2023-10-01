import React, { FC, memo } from "react";
import Colors from "../../constants/Colors";
import { SvgXml } from "react-native-svg";
import Dimensions from "constants/Dimensions";
import { useAppTheme } from "utils/ui";

type DownArrowIconProps = {
   color?: string;
   style?: React.ComponentProps<typeof SvgXml>["style"];
};

const DownArrowIcon: FC<DownArrowIconProps> = memo(
   ({ color, style }: DownArrowIconProps) => {
      const colorScheme = useAppTheme();
      const _color = color ?? Colors[colorScheme].defaultIconColor;

      const svg = `
         <svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M10.5003 14.625C10.0855 14.6229 9.67628 14.5285 9.30246 14.3486C8.92864 14.1687 8.59954 13.9079 8.33906 13.585L1.49781 5.2975C1.09805 4.79857 0.846488 4.19738 0.771789 3.56244C0.697089 2.92749 0.802258 2.28433 1.07531 1.70625C1.29677 1.20384 1.65815 0.775797 2.11632 0.473237C2.57448 0.170677 3.11005 0.00639121 3.65906 0H17.3416C17.8906 0.00639121 18.4261 0.170677 18.8843 0.473237C19.3425 0.775797 19.7039 1.20384 19.9253 1.70625C20.1984 2.28433 20.3035 2.92749 20.2288 3.56244C20.1541 4.19738 19.9026 4.79857 19.5028 5.2975L12.6616 13.585C12.4011 13.9079 12.072 14.1687 11.6982 14.3486C11.3243 14.5285 10.9152 14.6229 10.5003 14.625Z" fill="${_color}"/>
         </svg>
      `;

      const width = Dimensions.downArrow.defaultSize;
      const height = Dimensions.downArrow.defaultSize;
      const padding = Dimensions.downArrow.defaultPaddingTop;

      return (
         <SvgXml
            xml={svg}
            width={width}
            height={height}
            style={[{ marginTop: padding }, style]}
         />
      );
   }
);

export default DownArrowIcon;
