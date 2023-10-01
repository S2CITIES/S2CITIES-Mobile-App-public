import { createSlice } from "@reduxjs/toolkit";
import * as selectors from "./alertsVideos.selectors";
import { AlertsVideosState } from "./alertsVideos.interfaces";
import * as sagas from "./alertsVideos.sagas";
import * as extraActions from "../../extra-actions";
import {
   GetAlertsVideoS3SignedurlFailAction,
   GetAlertsVideoS3SignedurlSuccessAction,
   GetAlertsVideoS3SignedurlsFailAction,
   GetAlertsVideoS3SignedurlsSuccessAction,
} from "../alerts/alerts.interfaces";
import { AlertVideo } from "models";

const initialState: AlertsVideosState = {
   videos: [],
};

export const alertsVideosStore = createSlice({
   name: "alertsVideos",
   initialState,
   reducers: {},
   extraReducers: builder => {
      // get video url success
      builder.addCase(
         extraActions.getAlertsVideoS3signedurlByAlertId.success,
         (state, action: GetAlertsVideoS3SignedurlSuccessAction) => {
            const { alertId } = action.payload.prepareParams;
            const { download_signed_url } = action.payload.data;

            console.log(`received url: ${download_signed_url}`);

            state.videos = state.videos
               .filter(video => video.alertId !== alertId) // remove previous video of this alert (if any)
               .concat(
                  new AlertVideo({ alertId, videoUrl: download_signed_url }) // add the new one
               );
         }
      );

      // get video url fail
      builder.addCase(
         extraActions.getAlertsVideoS3signedurlByAlertId.fail,
         (state, action: GetAlertsVideoS3SignedurlFailAction) => {
            const { alertId } = action.payload.prepareParams;

            console.log(
               `error: ${action.payload.status} ${action.payload.message}`
            );

            // save 'error' in case of failure
            state.videos = state.videos
               .filter(video => video.alertId !== alertId)
               .concat(new AlertVideo({ alertId, videoUrl: "error" }));
         }
      );

      // get multiple videos urls success
      builder.addCase(
         extraActions.getAlertsVideoS3signedurls.success,
         (state, action: GetAlertsVideoS3SignedurlsSuccessAction) => {
            const { alertIds } = action.payload.prepareParams;
            const { signedUrls } = action.payload.data;

            if (alertIds.length !== signedUrls.length) {
               console.log(
                  `error: received a different number of video urls than the requested ones`
               );
               return;
            }

            signedUrls.forEach(url =>
               console.log(`received video url: ${url}`)
            );

            // save videos info
            state.videos = state.videos
               .filter(video => !alertIds.includes(video.alertId)) // remove previous videos (if any)
               .concat(
                  signedUrls.map(
                     (videoUrl, i) =>
                        new AlertVideo({
                           alertId: alertIds[i],
                           videoUrl: videoUrl,
                        })
                  ) // add the new ones
               );
         }
      );

      // get multiple videos urls fail
      builder.addCase(
         extraActions.getAlertsVideoS3signedurls.fail,
         (state, action: GetAlertsVideoS3SignedurlsFailAction) => {
            const { alertIds } = action.payload.prepareParams;

            console.log(
               `error: ${action.payload.status} ${action.payload.message}`
            );

            // save 'error' in case of failure
            state.videos = state.videos
               .filter(video => !alertIds.includes(video.alertId))
               .concat(
                  alertIds.map(
                     alertId =>
                        new AlertVideo({
                           alertId: alertId,
                           videoUrl: "error",
                        })
                  )
               );
         }
      );
   },
});

export { selectors, sagas };
