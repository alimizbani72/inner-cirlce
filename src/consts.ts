import type { plans } from "./configs/plans";
import { resolvePathJoin } from "./utils/path";

export const minecraftEndpoint = resolvePathJoin(process.env.NEXT_PUBLIC_MINECRAFT_ENDPOINT || "", "api/v1");

export const downloadURL = (fileKey: number | string | undefined) =>
  resolvePathJoin(
    process.env.NEXT_PUBLIC_MINECRAFT_ENDPOINT || "",
    "api/v1",
    "/files/download/",
    fileKey?.toString() || ""
  );

export const referralLink = (inviteCode: string) =>
  resolvePathJoin(process.env.NEXT_PUBLIC_URL || "", `/register/?sponsor=${inviteCode}`);

export const kycCallback = (callback: string) => resolvePathJoin(process.env.NEXT_PUBLIC_URL || "", callback);
export const getUserPlanType = (userInfo: any): keyof typeof plans => userInfo?.data?.plan_type || "plankton";
export const CMSDownloadURL = (url: string) => resolvePathJoin(process.env.NEXT_PUBLIC_CMS_ENDPOINT || "", url || "");
