import { RootState } from "redux-store";

export const getZones = (state: RootState) => state?.zones;

export const getAllZones = (state: RootState) => state?.zones?.allZones ?? [];

export const getZone = (id: string) => (state: RootState) =>
   (state?.zones?.allZones ?? []).find(zone => zone._id === id);
