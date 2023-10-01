import { RootState } from "redux-store";

export const getAlertsVideos = (state: RootState) => state?.alertsVideos;

export const getAlertVideoUrl = (alertId: string) => (state: RootState) => {
   const allVideos = state?.alertsVideos?.videos ?? [];

   return allVideos.find(video => video.alertId === alertId)?.videoUrl;
};

export const getAlertsVideosUrls =
   (alertIds: string[]) => (state: RootState) => {
      if (!alertIds) return [];

      const allVideos = state?.alertsVideos?.videos ?? [];

      return allVideos
         .filter(video => alertIds.includes(video.alertId))
         .map(video => video.videoUrl);
   };
