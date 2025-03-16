import dotenv from 'dotenv';
import { resolvePathJoin } from './utils/path';
import type { plans } from './configs/plans';
import type { AuthHttpMeResponse } from './services/minecraft/minecraftAPI.schemas';
dotenv.config();
export const MINECRAFT_ENDPOINT = resolvePathJoin(
  process.env.NEXT_PUBLIC_MINECRAFT_ENDPOINT || '',
  'api/v1'
);

export const MINECRAFT_API_DOCS = resolvePathJoin(
  process.env.NEXT_PUBLIC_MINECRAFT_ENDPOINT || '',
  '/reference/docs/swagger.json'
);

export const CMS_API_DOCS = resolvePathJoin(
  process.env.NEXT_PUBLIC_CMS_ENDPOINT || 'https://cms.innercircle-chainmind.com/',
  '/custom-api-docs/specs'
);

export const CMS_BASE_URL_ENDPOINT = resolvePathJoin(
  process.env.NEXT_PUBLIC_CMS_ENDPOINT || 'https://cms.innercircle-chainmind.com/',
  '/api'
);

export const downloadURL = (fileKey: number | string | undefined) =>
  resolvePathJoin(
    process.env.NEXT_PUBLIC_MINECRAFT_ENDPOINT || '',
    'api/v1',
    '/files/download/',
    fileKey?.toString() || ''
  );

export const referralLink = (inviteCode: string) =>
  resolvePathJoin(process.env.NEXT_PUBLIC_URL || '', `/register/?sponsor=${inviteCode}`);

export const kycCallback = (callback: string) =>
  resolvePathJoin(process.env.NEXT_PUBLIC_URL || '', callback);

export const CMSDownloadURL = (url: string) =>
  resolvePathJoin(process.env.NEXT_PUBLIC_CMS_ENDPOINT || '', url || '');
export const getUserPlanType = (userInfo: AuthHttpMeResponse | undefined): keyof typeof plans =>
  (userInfo?.plan_type as any) || 'plankton';
