import React, { FC, memo } from "react";
import { white } from "../../constants/Colors";
import { SvgXml } from "react-native-svg";
import Dimensions from "constants/Dimensions";

type PlusIconProps = {
   color?: string;
   style?: React.ComponentProps<typeof SvgXml>["style"];
};

const PlusIcon: FC<PlusIconProps> = memo(({ color, style }: PlusIconProps) => {
   const _color = color ?? white;

   const svg = `
         <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M20.625 9.625H12.375V1.375C12.375 1.01033 12.2301 0.660591 11.9723 0.402728C11.7144 0.144866 11.3647 0 11 0C10.6353 0 10.2856 0.144866 10.0277 0.402728C9.76987 0.660591 9.625 1.01033 9.625 1.375V9.625H1.375C1.01033 9.625 0.660591 9.76987 0.402728 10.0277C0.144866 10.2856 0 10.6353 0 11C0 11.3647 0.144866 11.7144 0.402728 11.9723C0.660591 12.2301 1.01033 12.375 1.375 12.375H9.625V20.625C9.625 20.9897 9.76987 21.3394 10.0277 21.5973C10.2856 21.8551 10.6353 22 11 22C11.3647 22 11.7144 21.8551 11.9723 21.5973C12.2301 21.3394 12.375 20.9897 12.375 20.625V12.375H20.625C20.9897 12.375 21.3394 12.2301 21.5973 11.9723C21.8551 11.7144 22 11.3647 22 11C22 10.6353 21.8551 10.2856 21.5973 10.0277C21.3394 9.76987 20.9897 9.625 20.625 9.625Z" fill="${_color}"/>
         </svg>
      `;

   const width = Dimensions.alertsHeader.addButtonPlusSize;
   const height = Dimensions.alertsHeader.addButtonPlusSize;

   return <SvgXml xml={svg} width={width} height={height} style={style} />;
});

export default PlusIcon;
