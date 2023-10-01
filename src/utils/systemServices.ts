import Strings from "constants/Strings";
import * as Location from "expo-location";
import { Dispatch } from "redux";
import { actions } from "redux-store";
import { ToastDuration, ToastType } from "redux-store/slices/ui/ui.interfaces";

export async function getLocation(
   dispatch: Dispatch
): Promise<{ address?: string; latitude?: string; longitude?: string }> {
   let rawLocation: Location.LocationObject;
   try {
      rawLocation = await Location.getCurrentPositionAsync({
         accuracy: Location.LocationAccuracy.Highest,
      });
   } catch {}

   if (!rawLocation?.coords) {
      // an error occurred
      dispatch(
         actions.setToast({
            tag: "main",
            open: true,
            duration: ToastDuration.Long,
            message: Strings.en.location_retrieving_error,
            toastType: ToastType.Error,
         })
      );
      return null;
   }

   // transform coordinates into address
   const { latitude, longitude } = rawLocation.coords;
   console.log(`(lat: ${latitude}, lng: ${longitude})`);

   let addressResponse: Location.LocationGeocodedAddress[];
   try {
      addressResponse = await Location.reverseGeocodeAsync({
         latitude,
         longitude,
      });
   } catch {}

   if (!addressResponse || addressResponse.length == 0) {
      // an error occurred converting coordinates into address
      dispatch(
         actions.setToast({
            tag: "main",
            open: true,
            duration: ToastDuration.Long,
            message: Strings.en.location_address_conversion_error,
            toastType: ToastType.Error,
         })
      );
      return { latitude: `${latitude}`, longitude: `${longitude}` };
   }

   console.log(addressResponse[0]);

   const { street, streetNumber, postalCode, city, subregion } =
      addressResponse[0];

   const addressFirstPart = street
      ? `${street}${streetNumber ? ` ${streetNumber}` : ""}`
      : "";

   const addressSecondPart = [postalCode, city]
      .filter(field => !!field)
      .join(" ");

   const addressThirdPart = subregion;

   const userAddress = [addressFirstPart, addressSecondPart, addressThirdPart]
      .filter(part => !!part)
      .join(", ");

   return {
      address: userAddress,
      latitude: `${latitude}`,
      longitude: `${longitude}`,
   };
}
