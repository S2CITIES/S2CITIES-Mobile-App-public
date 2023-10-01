import * as extraActions from "../extra-actions";
import * as ajax from "./ajax";
import * as ui from "./ui";
import * as alerts from "./alerts";
import * as emergency from "./emergency";
import * as zones from "./zones";
import * as newAlert from "./newAlert";
import * as users from "./users";
import * as alertsVideos from "./alertsVideos";
import * as pushNotifications from "./pushNotifications";

export const reducers = {
   ui: ui.uiStore.reducer,
   ajax: ajax.ajaxStore.reducer,
   alerts: alerts.alertsStore.reducer,
   emergency: emergency.emergencyStore.reducer,
   zones: zones.zonesStore.reducer,
   newAlert: newAlert.newAlertStore.reducer,
   users: users.usersStore.reducer,
   alertsVideos: alertsVideos.alertsVideosStore.reducer,
   pushNotifications: pushNotifications.pushNotificationsStore.reducer,
};

export const actions = {
   ...extraActions,
   ...ui.uiStore.actions,
   ...ajax.ajaxStore.actions,
   ...alerts.alertsStore.actions,
   ...emergency.emergencyStore.actions,
   ...zones.zonesStore.actions,
   ...newAlert.newAlertStore.actions,
   ...users.usersStore.actions,
   ...alertsVideos.alertsVideosStore.actions,
   ...pushNotifications.pushNotificationsStore.actions,
};

export const selectors = {
   ...ui.selectors,
   ...ajax.selectors,
   ...alerts.selectors,
   ...emergency.selectors,
   ...zones.selectors,
   ...newAlert.selectors,
   ...users.selectors,
   ...alertsVideos.selectors,
   ...pushNotifications.selectors,
};

export const sagas = [
   ...Object.values(ui.sagas),
   ...Object.values(ajax.sagas),
   ...Object.values(alerts.sagas),
   ...Object.values(emergency.sagas),
   ...Object.values(zones.sagas),
   ...Object.values(users.sagas),
   ...Object.values(alertsVideos.sagas),
   ...Object.values(pushNotifications.sagas),
];
