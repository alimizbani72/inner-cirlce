import urlJoin from "url-join";
export const minecraftEndpoint = `${process.env.NEXT_PUBLIC_MINECRAFT_ENDPOINT}api/v1`;

export const downloadURL = (fileKey: number | string | undefined) => `${minecraftEndpoint}/files/download/${fileKey}`;
export const referralLink = (inviteCode: string) => urlJoin(process.env.NEXT_PUBLIC_URL!, "/register/", inviteCode);

export const kycCallback = (callback: string) => urlJoin(process.env.NEXT_PUBLIC_URL!, callback);
