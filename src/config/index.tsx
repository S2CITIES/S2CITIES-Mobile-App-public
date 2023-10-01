const apiUrls = {
   local: "http://127.0.0.1:3000/api",
   remote: "",
   // * add here any other url *
} as const;

const hardcodedUserIds = {
   local: "",
   remote: "",
} as const;

type Api = typeof apiUrls[keyof typeof apiUrls];
type UserId = typeof hardcodedUserIds[keyof typeof hardcodedUserIds];

// * modify it to change environment *
const apiUrl: Api = apiUrls.remote;
export const hardcodedUserId: UserId = hardcodedUserIds.remote;

export const apiBaseUrl = (): string => process.env.API_BASE_URL ?? apiUrl;
