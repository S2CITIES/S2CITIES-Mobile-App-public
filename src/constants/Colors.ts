const tintColorLight = "#2f95dc";

export const white = "#FFFFFF";

/* app colors */
export const appAttentionPurple = "#C242FF";
export const appBackgroundBlue = "#181C24";
export const appBackgroundDarkGrey = "#efefef";
export const appBackgroundGrey = "#f7f7f7";
export const appDarkDarkBlue = "#242A38";
export const appDarkDarkGrey = "#1E1E1E";
export const appDarkerGrey = "#666677";
export const appDarkGrey = "#899";
export const appSlightlyDarkerGrey = "#A0A0A0";
export const appSlightlyDarkGrey = "#CCCCCC";
export const appGrey = "#C9D6DF";
export const appPrimaryBlue = "#2B68FF";
export const appRedError = "#F63B2B";
export const appShadowGrey = "#C7C7C7";
export const appShadowLightGrey = "#D5D5D5";
export const appShadowDarkBlue = "#12151A";
export const appGenericAlertBlue = "#6C85C4";
export const appEmergencyAlertBlue = "#163175";
export const appSuccess = "#00A442";
export const appLink = "#749CFF";
export const appDarkTransparentColor = "#000000aa";
export const appClear = "#00000000";
export const lightBlue = "#5FA0C5";
export const appYellowWarning = "#ffdb4a";

export type AppThemeColors = {
   primary: string;
   text: string;
   background: string;
   tint: string;
   defaultIconColor: string;
   tabIconDefault: string;
   tabIconSelected: string;
   bottomBarBackground: string;
   topBarIconColor: string;
   topBarBackground: string;
   mainHeaderBackground: string;
   mainHeaderShadow: string;
   errorPopUpBackground: string;
   errorPopUpTextColor: string;
   infoPopUpBackground: string;
   infoPopUpTextColor: string;
   warningPopUpBackground: string;
   warningPopUpTextColor: string;
   successPopUpBackground: string;
   successPopUpTextColor: string;
   spinnerColor: string;
   buttonDefaultShadowStart: string;
   buttonDefaultColor: string;
   buttonDefaultTextColor: string;
   handSignalAlert: string;
   genericAlert: string;
   emergencyAlert: string;
   checkedAlert: string;
   lineSeparator: string;
   videoThumbnailDefaultBackground: string;
   videoThumbnailPlayIconColor: string;
   alertActionButtonColor: string;
   alertActionRowBorderColor: string;
   alertActionIconColor: string;
   alertActionDisabledIconColor: string;
   alertActionLabelColor: string;
   alertActionDisabledLabelColor: string;
   alertDetailAddressColor: string;
   modalOverlayBackground: string;
   loginText: string;
   loginBackArrow: string;
   nameInitialsIcon: string;
   nameInitialsIconText: string;
   settingsHeaderBorderColor: string;
   settingsJustDarkModeOnColor: string;
   settingsJustDarkModeOffColor: string;
   defaultCheckbox: string;
};

const appThemes: AppThemes = {
   light: {
      primary: appPrimaryBlue,
      text: appDarkDarkBlue,
      background: white,
      tint: tintColorLight,
      defaultIconColor: appDarkDarkBlue,
      tabIconDefault: appDarkDarkBlue,
      tabIconSelected: appPrimaryBlue,
      bottomBarBackground: appBackgroundGrey,
      topBarIconColor: appDarkDarkBlue,
      topBarBackground: appBackgroundGrey,
      mainHeaderBackground: appBackgroundDarkGrey,
      mainHeaderShadow: appShadowLightGrey,
      errorPopUpBackground: appRedError,
      errorPopUpTextColor: white,
      infoPopUpBackground: lightBlue,
      infoPopUpTextColor: white,
      warningPopUpBackground: appYellowWarning,
      warningPopUpTextColor: appDarkDarkBlue,
      successPopUpBackground: appSuccess,
      successPopUpTextColor: white,
      spinnerColor: appPrimaryBlue,
      buttonDefaultShadowStart: appShadowGrey,
      buttonDefaultColor: appPrimaryBlue,
      buttonDefaultTextColor: white,
      handSignalAlert: appPrimaryBlue,
      genericAlert: appGenericAlertBlue,
      emergencyAlert: appEmergencyAlertBlue,
      checkedAlert: appDarkerGrey,
      lineSeparator: appDarkDarkBlue,
      videoThumbnailDefaultBackground: appSlightlyDarkGrey,
      videoThumbnailPlayIconColor: white,
      alertActionButtonColor: appBackgroundGrey,
      alertActionRowBorderColor: appGrey,
      alertActionIconColor: appDarkDarkBlue,
      alertActionDisabledIconColor: appSlightlyDarkerGrey,
      alertActionLabelColor: appDarkDarkBlue,
      alertActionDisabledLabelColor: appSlightlyDarkerGrey,
      alertDetailAddressColor: appPrimaryBlue,
      modalOverlayBackground: appDarkTransparentColor,
      loginText: appDarkGrey,
      loginBackArrow: appDarkDarkBlue,
      nameInitialsIcon: appGrey,
      nameInitialsIconText: appDarkDarkBlue,
      settingsHeaderBorderColor: appGrey,
      settingsJustDarkModeOnColor: appShadowLightGrey,
      settingsJustDarkModeOffColor: appDarkDarkGrey,
      defaultCheckbox: appDarkerGrey,
   },
   dark: {
      primary: appPrimaryBlue,
      text: white,
      background: appBackgroundBlue,
      tint: appBackgroundBlue,
      defaultIconColor: white,
      tabIconDefault: appGrey,
      tabIconSelected: appPrimaryBlue,
      bottomBarBackground: appDarkDarkGrey,
      topBarIconColor: appGrey,
      topBarBackground: appDarkDarkBlue,
      mainHeaderBackground: appBackgroundBlue,
      mainHeaderShadow: appShadowDarkBlue,
      errorPopUpBackground: appRedError,
      errorPopUpTextColor: white,
      infoPopUpBackground: lightBlue,
      infoPopUpTextColor: white,
      warningPopUpBackground: appYellowWarning,
      warningPopUpTextColor: appDarkDarkBlue,
      successPopUpBackground: appSuccess,
      successPopUpTextColor: white,
      spinnerColor: appPrimaryBlue,
      buttonDefaultShadowStart: appShadowDarkBlue,
      buttonDefaultColor: appPrimaryBlue,
      buttonDefaultTextColor: white,
      handSignalAlert: appPrimaryBlue,
      genericAlert: appGenericAlertBlue,
      emergencyAlert: appEmergencyAlertBlue,
      checkedAlert: appDarkDarkBlue,
      lineSeparator: appGrey,
      videoThumbnailDefaultBackground: appSlightlyDarkGrey,
      videoThumbnailPlayIconColor: white,
      alertActionButtonColor: appDarkDarkBlue,
      alertActionRowBorderColor: appBackgroundBlue,
      alertActionIconColor: appGrey,
      alertActionDisabledIconColor: appSlightlyDarkerGrey,
      alertActionLabelColor: white,
      alertActionDisabledLabelColor: appSlightlyDarkerGrey,
      alertDetailAddressColor: appLink,
      modalOverlayBackground: appDarkTransparentColor,
      loginText: appGrey,
      loginBackArrow: white,
      nameInitialsIcon: appShadowLightGrey,
      nameInitialsIconText: appDarkDarkBlue,
      settingsHeaderBorderColor: appDarkDarkBlue,
      settingsJustDarkModeOnColor: white,
      settingsJustDarkModeOffColor: appDarkDarkGrey,
      defaultCheckbox: appGrey,
   },
};

type AppThemes = {
   light: AppThemeColors;
   dark: AppThemeColors;
};

export default appThemes;
