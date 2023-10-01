import Dimensions from "./Dimensions";

export type AppLanguages = {
   en: AppLanguageStrings;
};

export type AppLanguageStrings = {
   alert_action_assign: string;
   alert_action_checked: string;
   alert_action_false_alarm: string;
   alert_details_alert_info: string;
   alerts_filter_all: string;
   alerts_filter_hand_signal_alert: string;
   alerts_filter_generic_alert: string;
   alerts_filter_emergency_alert: string;
   modal_confirm_default_label: string;
   modal_reject_default_label: string;
   cover_sign_in: string;
   cover_s2cities_motto: string;
   login_welcome_back_title: string;
   login_username_label: string;
   login_password_label: string;
   login_error_message: string;
   logout: string;
   logout_alert_modal_message: string;
   settings_use_system_theme: string;
   tasks_you_dont_have_any_task: string;
   tasks_no_tasks: string;
   emergency_title: string;
   emergency_ask_for_help: string;
   emergency_already_called_alert: string;
   location_permission_not_granted_message: string;
   location_retrieving_error: string;
   location_address_conversion_error: string;
   add_alert_go_back_alert_message: string;
   yes: string;
   no: string;
   exit: string;
   stay: string;
   cancel: string;
   add_alert_alert_info: string;
   add_alert_location: string;
   add_alert_zone: string;
   add_alert_type: string;
   add_alert_upload_video: string;
   add_alert_take_video: string;
   add_alert_alert_info_placeholder: string;
   add_alert_location_placeholder: string;
   add_alert_create_alert: string;
   add_alert_zone_other: string;
   add_alert_create_alert_modal_message: string;
   add_alert_address_input_error_message: string;
   add_alert_success_toast_message: string;
   add_alert_error_toast_message: string;
   get_users_modal_error_message: string;
   get_zones_modal_error_message: string;
   assign_alert_modal_title: string;
   checked_alert_modal_title: string;
   unchecked_alert_modal_title: string;
   false_alarm_alert_modal_title: string;
   not_false_alarm_alert_modal_title: string;
   camera_permission_not_granted_message: string;
   audio_permission_not_granted_message: string;
   video_recoding_max_length_message: string;
   retrieving_location_loading: string;
   alert_type_generic_alert: string;
   alert_type_hand_signal_alert: string;
   alert_type_emergency_alert: string;
   add_alert_type_hand_signal_alert_no_video_provided_error: string;
   video_required: string;
   video_upload_from_gallery_error: string;
   video_discard_alert_message: string;
   alerts_statistics_dashboard_label: string;
   months: string[];
};

const Strings: AppLanguages = {
   en: {
      alert_action_assign: "Assign",
      alert_action_checked: "Checked",
      alert_action_false_alarm: "False Alarm",
      alert_details_alert_info: "Alert info",
      alerts_filter_all: "All",
      alerts_filter_hand_signal_alert: "Hand Signal Alerts",
      alerts_filter_generic_alert: "Generic Alert",
      alerts_filter_emergency_alert: "Emergency Alert",
      modal_confirm_default_label: "Confirm",
      modal_reject_default_label: "  Reject  ",
      cover_sign_in: "Sign in",
      cover_s2cities_motto: "For safety, for women,\nfor everybody.",
      login_welcome_back_title: "Welcome\nBack!",
      login_username_label: "Username",
      login_password_label: "Password",
      login_error_message: "Incorrect username or password",
      logout: "Logout",
      logout_alert_modal_message: "Do you want to logout?",
      settings_use_system_theme: "Use System Theme",
      tasks_you_dont_have_any_task: "You don't have any more tasks",
      tasks_no_tasks: "No Tasks",
      emergency_title: `Hold the button for ${Math.round(
         Dimensions.emergency.buttonPressDurationInMs / 1000
      )} seconds to call the emergency`,
      emergency_ask_for_help: "Ask for\nHelp",
      emergency_already_called_alert:
         "You already called the emergency. Do you want to call them again?",
      location_permission_not_granted_message:
         "Location permission not granted: app cannot send your location in case of emergency",
      location_retrieving_error: "An error occurred retrieving location",
      location_address_conversion_error:
         "An error occurred converting your coordinates into address",
      add_alert_go_back_alert_message:
         "You will lose the inserted information. Do you want to exit?",
      yes: "Yes",
      no: "No",
      exit: "Exit",
      stay: "Stay",
      cancel: "Cancel",
      add_alert_alert_info: "Alert info",
      add_alert_location: "Location",
      add_alert_zone: "Zone",
      add_alert_type: "Alert Type",
      add_alert_upload_video: "Upload Video",
      add_alert_take_video: "Take Video",
      add_alert_alert_info_placeholder: "Type some alert information here",
      add_alert_location_placeholder: "Type alert location here",
      add_alert_create_alert: "Create Alert",
      add_alert_zone_other: "Other",
      add_alert_create_alert_modal_message:
         "Do you want to create this new alert?",
      add_alert_address_input_error_message:
         "You must provide an address for the alert",
      add_alert_success_toast_message: "Alert successfully created",
      add_alert_error_toast_message: "An error occurred creating the alert",
      get_users_modal_error_message: "An error occurred retrieving users",
      get_zones_modal_error_message: "An error occurred retrieving zones",
      assign_alert_modal_title: "Assign alert to:",
      checked_alert_modal_title:
         "This alert task will be marked as CHECKED. Do you want to proceed?",
      unchecked_alert_modal_title:
         "This alert task will be marked as UNCHECKED. Do you want to proceed?",
      false_alarm_alert_modal_title:
         "This alert will be marked as a FALSE ALARM. Do you want to proceed?",
      not_false_alarm_alert_modal_title:
         "This alert will NOT be marked as a FALSE ALARM anymore. Do you want to proceed?",
      camera_permission_not_granted_message:
         "Camera permissions not granted: app cannot record a video",
      audio_permission_not_granted_message:
         "Audio permissions not granted: app cannot record a video",
      video_recoding_max_length_message:
         "You can record a video of up to 15 seconds",
      retrieving_location_loading: "Retrieving location...",
      alert_type_generic_alert: "Generic Alert",
      alert_type_hand_signal_alert: "Hand Signal Alert",
      alert_type_emergency_alert: "Emergency Alert",
      add_alert_type_hand_signal_alert_no_video_provided_error:
         "Warning: a Hand Signal Alert requires a video",
      video_required: "video required",
      video_upload_from_gallery_error:
         "An error occurred retrieving video from the gallery",
      video_discard_alert_message: "Do you want to discard the video?",
      alerts_statistics_dashboard_label: "Last months statistics",
      months: [
         "January",
         "February",
         "March",
         "April",
         "May",
         "June",
         "July",
         "August",
         "September",
         "October",
         "November",
         "December",
      ],
   },
};

export default Strings;
