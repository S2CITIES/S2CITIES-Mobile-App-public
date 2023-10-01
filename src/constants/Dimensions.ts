type AppDimensions = {
   splash: {
      slidesDurationInMs: number[];
   };
   bottomBar: {
      height: number;
      paddingBottom: number;
   };
   bottomBarItem: {
      marginTop: number;
   };
   bottomBarIcon: {
      size: number;
   };
   topBar: {
      height: number;
      borderWidth: number;
   };
   topBarRightIcon: {
      size: number;
      marginRight: number;
   };
   topBarLeftIcon: {
      size: number;
      marginLeft: number;
   };
   topBarTitle: {
      fontSize: number;
   };
   mainHeader: {
      paddingHorizontal: number;
      paddingVertical: number;
   };
   alertsHeader: {
      paddingHorizontal: number;
      paddingVertical: number;
      filterLabelSize: number;
      filterLabelSpacing: number;
      addButtonPlusSize: number;
      addButtonPadding: number;
   };
   mainToast: {
      marginTop: number;
      longDurationInMs: number;
      mediumDurationInMs: number;
      shortDurationInMs: number;
   };
   spinner: {
      size: number;
   };
   mainContainer: {
      defaultPaddingTop: number;
      defaultPaddingBottom: number;
   };
   smallAlertCard: {
      textRowVerticalMargin: number;
      marginHorizontal: number;
      marginVertical: number;
      paddingHorizontal: number;
      paddingVertical: number;
      textSize: number;
      defaultAppButtonBorderRadius: number;
      defaultAppButtonMargin: number;
   };
   taskBox: {
      marginHorizontal: number;
      marginVertical: number;
      checkboxDefaultSize: number;
   };
   tasksHeader: {
      paddingHorizontal: number;
      paddingVertical: number;
      filterTextSize: number;
      filterPaddingHorizontal: number;
      filterPaddingVertical: number;
   };
   lineSeparator: {
      verticalSpacing: number;
      labelMarginHorizontal: number;
      defaultMarginTop: number;
      defaultMarginBottom: number;
      defaultMarginStart: number;
      defaultMarginEnd: number;
      labelSize: number;
      thickness: number;
   };
   downArrow: {
      defaultPaddingTop: number;
      defaultSize: number;
   };
   maxAlertAddressLength: number;
   alertDetail: {
      videoThumbSizeRatio: number;
      alertActionBoxPadding: number;
      alertActionIconSize: number;
      alertActionItemMargin: number;
      alertActionLoadingSize: number;
      alertActionLoadingMargin: number;
      alertActionLabelSize: number;
      alertActionsRowBorderWidth: number;
      alertInfoTextSize: number;
      alertInfoMarginHorizontal: number;
      alertInfoMarginVertical: number;
      alertInfoSeparationMarginVertical: number;
      alertInfoDescriptionLineHeight: number;
      alertAddressIconSize: number;
      alertAddressMarginHorizontal: number;
      alertAddressItemsSeparation: number;
      alertAddressTextSize: number;
      alertsHeaderPaddingVertical: number;
   };
   playIcon: {
      defaultSize: number;
   };
   modal: {
      textSize: number;
      buttonTextSize: number;
      boxPaddingHorizontal: number;
      boxPaddingVertical: number;
      textMarginVertical: number;
      textPaddingHorizontal: number;
      textLineHeight: number;
      buttonsMarginVertical: number;
      buttonPaddingVertical: number;
      buttonMarginHorizontal: number;
   };
   s2citiesLogo: {
      aspectRatio: number;
   };
   cover: {
      containerPaddingHorizontal: number;
      containerPaddingVertical: number;
      mainButtonTextSize: number;
      mottoTextSize: number;
   };
   login: {
      mainContainerPaddingHorizontal: number;
      mainContainerPaddingVertical: number;
      mainContainerElementMarginVertical: number;
      titleFontSize: number;
      formFieldLabelSize: number;
      formFieldInputTextSize: number;
      buttonExtraMarginVertical: number;
      buttonExtraPaddingBottom: number;
      mainButtonTextSize: number;
      errorTextSize: number;
      errorTextMarginBottom: number;
   };
   settings: {
      mainContainerPadding: number;
      itemPaddingVertical: number;
      itemPaddingHorizontal: number;
      itemMarginVertical: number;
      itemMarginHorizontal: number;
      itemTextDefaultSize: number;
      nameInitialsTextSize: number;
      nameInitialsIconSize: number;
      nameInitialsIconMarginEnd: number;
      nameTextSize: number;
   };
   emergency: {
      titleSize: number;
      titleTopPadding: number;
      titlePaddingHorizontal: number;
      buttonFontSize: number;
      buttonWrapperBorderWidth: number;
      buttonWrapperDefaultPadding: number;
      buttonWrapperMaxPadding: number;
      buttonMinOpacity: number;
      buttonAnimationDurationInMs: number;
      buttonPressDurationInMs: number;
   };
   addAlert: {
      alertDataContainerMarginHorizontal: number;
      alertDataContainerMarginVertical: number;
      alertDataContainerElementMarginVertical: number;
      formFieldLabelSize: number;
      formFieldInputTextSize: number;
      formFieldInputTextPaddingHorizontal: number;
      alertInfoInputTextHeight: number;
      locationInputTextHeight: number;
      extraBottomPadding: number;
      createAlertButtonMarginVertical: number;
      createAlertButtonTextSize: number;
      createAlertButtonPaddingVertical: number;
      locationLoadingTextSize: number;
      locationLoadingTextMarginEnd: number;
      locationLoadingMarginVertical: number;
   };
   recordAlertVideo: {
      stopwatchTextPadding: number;
      stopwatchTextSize: number;
      stopwatchBorderRadius: number;
      actionButtonTextSize: number;
      stopwatchTopOffset: number;
      actionButtonBottomOffset: number;
   };
   dashboard: {
      bigAlertCardBorderRadius: number;
   };
};

const Dimensions: AppDimensions = {
   splash: {
      slidesDurationInMs: [700, 700, 1000],
   },
   bottomBar: {
      height: 60,
      paddingBottom: 17,
   },
   bottomBarItem: {
      marginTop: 5,
   },
   bottomBarIcon: {
      size: 24,
   },
   topBar: {
      height: 62,
      borderWidth: 0.5,
   },
   topBarRightIcon: {
      size: 26,
      marginRight: 20,
   },
   topBarLeftIcon: {
      size: 23,
      marginLeft: 28,
   },
   topBarTitle: {
      fontSize: 24,
   },
   mainHeader: {
      paddingHorizontal: 30,
      paddingVertical: 17.5,
   },
   alertsHeader: {
      paddingHorizontal: 37,
      paddingVertical: 9,
      filterLabelSize: 16.5,
      filterLabelSpacing: 9.0,
      addButtonPlusSize: 20,
      addButtonPadding: 8.5,
   },
   mainToast: {
      marginTop: 45,
      longDurationInMs: 7000,
      mediumDurationInMs: 3000,
      shortDurationInMs: 1500,
   },
   spinner: {
      size: 50,
   },
   mainContainer: {
      defaultPaddingTop: 5,
      defaultPaddingBottom: 20,
   },
   smallAlertCard: {
      textRowVerticalMargin: 0.9,
      marginHorizontal: 35,
      marginVertical: 5.35,
      paddingHorizontal: 23.5,
      paddingVertical: 14.5,
      textSize: 13.5,
      defaultAppButtonBorderRadius: 13,
      defaultAppButtonMargin: 3,
   },
   taskBox: {
      marginHorizontal: 45,
      marginVertical: 6,
      checkboxDefaultSize: 30,
   },
   tasksHeader: {
      paddingHorizontal: 30,
      paddingVertical: 5,
      filterTextSize: 22,
      filterPaddingHorizontal: 9,
      filterPaddingVertical: 12,
   },
   lineSeparator: {
      verticalSpacing: 1.5,
      labelMarginHorizontal: 24,
      defaultMarginTop: 11,
      defaultMarginBottom: 8,
      defaultMarginStart: 16,
      defaultMarginEnd: 27,
      labelSize: 13,
      thickness: 0.5,
   },
   downArrow: {
      defaultPaddingTop: 2,
      defaultSize: 17.25,
   },
   maxAlertAddressLength: 60,
   alertDetail: {
      videoThumbSizeRatio: 16.0 / 9.0,
      alertActionBoxPadding: 10,
      alertActionIconSize: 40,
      alertActionItemMargin: 3.5,
      alertActionLoadingSize: 34,
      alertActionLoadingMargin: 6.5,
      alertActionLabelSize: 14.5,
      alertActionsRowBorderWidth: 0.5,
      alertInfoTextSize: 14.75,
      alertInfoMarginHorizontal: 21,
      alertInfoMarginVertical: 15,
      alertInfoSeparationMarginVertical: 3,
      alertInfoDescriptionLineHeight: 20,
      alertAddressIconSize: 35,
      alertAddressMarginHorizontal: 20,
      alertAddressItemsSeparation: 12,
      alertAddressTextSize: 14.75,
      alertsHeaderPaddingVertical: 16,
   },
   playIcon: {
      defaultSize: 40,
   },
   modal: {
      textSize: 16,
      buttonTextSize: 17.5,
      boxPaddingHorizontal: 19,
      boxPaddingVertical: 12,
      textMarginVertical: 13,
      textPaddingHorizontal: 6,
      textLineHeight: 23,
      buttonsMarginVertical: 4,
      buttonPaddingVertical: 20,
      buttonMarginHorizontal: 6,
   },
   s2citiesLogo: {
      aspectRatio: 4,
   },
   cover: {
      containerPaddingHorizontal: 30,
      containerPaddingVertical: 80,
      mainButtonTextSize: 20,
      mottoTextSize: 18,
   },
   login: {
      mainContainerPaddingHorizontal: 42,
      mainContainerPaddingVertical: 70,
      mainContainerElementMarginVertical: 25,
      titleFontSize: 35,
      formFieldLabelSize: 18,
      formFieldInputTextSize: 18,
      buttonExtraMarginVertical: 5,
      buttonExtraPaddingBottom: 250,
      mainButtonTextSize: 19,
      errorTextSize: 15,
      errorTextMarginBottom: 10,
   },
   settings: {
      mainContainerPadding: 8,
      itemPaddingVertical: 14,
      itemPaddingHorizontal: 45,
      itemMarginVertical: 8,
      itemMarginHorizontal: 30,
      itemTextDefaultSize: 18,
      nameInitialsTextSize: 17,
      nameInitialsIconSize: 50,
      nameInitialsIconMarginEnd: 13,
      nameTextSize: 22,
   },
   emergency: {
      titleSize: 24,
      titleTopPadding: 30,
      titlePaddingHorizontal: 60,
      buttonFontSize: 35,
      buttonWrapperBorderWidth: 5,
      buttonWrapperDefaultPadding: 10,
      buttonWrapperMaxPadding: 45,
      buttonMinOpacity: 0.4,
      buttonAnimationDurationInMs: 500,
      buttonPressDurationInMs: 2000,
   },
   addAlert: {
      alertDataContainerMarginHorizontal: 30,
      alertDataContainerMarginVertical: 10,
      alertDataContainerElementMarginVertical: 10,
      formFieldLabelSize: 16,
      formFieldInputTextSize: 16,
      formFieldInputTextPaddingHorizontal: 8,
      alertInfoInputTextHeight: 80,
      locationInputTextHeight: 60,
      extraBottomPadding: 0,
      createAlertButtonMarginVertical: 20,
      createAlertButtonTextSize: 18,
      createAlertButtonPaddingVertical: 18,
      locationLoadingTextSize: 13.5,
      locationLoadingTextMarginEnd: 15,
      locationLoadingMarginVertical: 12,
   },
   recordAlertVideo: {
      stopwatchTextPadding: 5,
      stopwatchTextSize: 22,
      stopwatchBorderRadius: 5,
      actionButtonTextSize: 22,
      stopwatchTopOffset: 20,
      actionButtonBottomOffset: 22,
   },
   dashboard: {
      bigAlertCardBorderRadius: 20,
   },
};

export default Dimensions;
