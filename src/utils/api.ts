import { HttpMethod } from "redux-store/extra-actions/apis/api-builder";

export type UploadVideoResponse = {
   status: number;
   statusText: string;
   body: any;
};

export async function uploadVideo(
   endpointUrl: string,
   method: HttpMethod,
   fileUri: string
): Promise<UploadVideoResponse> {
   const videoUriElements = fileUri.split(".");
   const videoExtension = videoUriElements[videoUriElements.length - 1];
   try {
      const uploadVideoResponse: UploadVideoResponse = await new Promise(
         (resolver, rejecter) => {
            const xhr = new XMLHttpRequest();

            xhr.onload = () => {
               if (xhr.status < 400) {
                  resolver({
                     status: xhr.status,
                     statusText: xhr.statusText,
                     body: xhr.response,
                  });
               } else {
                  const error = new Error(xhr.response);
                  rejecter(error);
               }
            };
            xhr.onerror = error => {
               rejecter(error);
            };

            try {
               xhr.open(method.toUpperCase(), endpointUrl);
               xhr.setRequestHeader("Content-Type", `video/${videoExtension}`);
               xhr.send({ uri: fileUri });
            } catch (error) {
               rejecter(error);
            }
         }
      );

      return uploadVideoResponse;
   } catch (e) {
      console.log("Generic error uploading video");
      console.log(e);
      return;
   }
}

export type UploadSignedUrlResponse = {
   upload_signed_url?: string;
   alert_id?: string;
   format?: string;
   key?: string;
};

export async function requestUploadSignedUrl(
   postSignedUrlEndpoint: string,
   videoUriFormat: string
): Promise<UploadSignedUrlResponse> {
   try {
      // request a signed URL to the BE to upload the video
      const postSignedUrlResponse = await fetch(postSignedUrlEndpoint, {
         method: HttpMethod.POST,
         headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            format: videoUriFormat,
         }),
      });

      if (!postSignedUrlResponse.ok) {
         console.log("Error requesting signed url: application error");
         console.log(
            `status: ${postSignedUrlResponse.status} - ${postSignedUrlResponse.statusText}`
         );

         return null;
      }

      const postSignedUrlBody = (await postSignedUrlResponse.json()) as {
         upload_signed_url?: string;
         alert_id?: string;
         format?: string;
         key?: string;
      };

      const { upload_signed_url, alert_id, format, key } = postSignedUrlBody;

      if (!upload_signed_url || !alert_id || !format || !key) {
         console.log("Error requesting signed url: bad response");
         console.log(
            `status: ${postSignedUrlResponse.status} - ${postSignedUrlResponse.statusText}`
         );
         console.log(postSignedUrlBody);

         return null;
      }

      console.log("Received signed url for upload:");
      console.log(postSignedUrlBody);

      return {
         upload_signed_url,
         alert_id,
         format,
         key,
      };
   } catch (e) {
      console.log("Generic error requesting signed url");
      console.log(e);

      return null;
   }
}
