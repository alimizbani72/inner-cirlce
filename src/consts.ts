import path from "path";

export const minecraftEndpoint = `${process.env.NEXT_PUBLIC_MINECRAFT_ENDPOINT}api/v1`;

export const downloadURL = (fileKey: number | string | undefined) => `${minecraftEndpoint}/files/download/${fileKey}`;
export const referralLink = (inviteCode: string) => path.join(process.env.NEXT_PUBLIC_URL!, "/register/", inviteCode);
