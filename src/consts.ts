export const byteBaseVideoUploadURL = `${process.env.NEXT_PUBLIC_BYTE_BASE_URL}/files/videoupload`;

export const byteBaseUploadURL = `${process.env.NEXT_PUBLIC_BYTE_BASE_URL}/files/upload`;

export const byteBaseDownloadURL = `${process.env.NEXT_PUBLIC_BYTE_BASE_URL}/files/download/`;

export const byteBaseBulkURL = `${process.env.NEXT_PUBLIC_BYTE_BASE_URL}/files/bulk/`;

export const byteBaseMultiBulkURL = `${process.env.NEXT_PUBLIC_BYTE_BASE_URL}/files/multibulk`;

export const byteBaseStreamURL = `${process.env.NEXT_PUBLIC_BYTE_BASE_URL}/streams/`;

export const dubcraftEndpoint = `${process.env.NEXT_PUBLIC_DUBCRAFT_ENDPOINT}api/v1`;

export const originalVideoURL = (projectKey: string | number | undefined) =>
  `${byteBaseStreamURL}${projectKey}/original.m3u8`;

export const videoURL = (projectKey: string | number | undefined, localeCode: string) =>
  `${byteBaseStreamURL}${projectKey}/master.m3u8?language=${localeCode}`;

export const downloadVideoURL = (videoKey: number | string | undefined, localeCode: string) =>
  `${byteBaseBulkURL}${localeCode ? `${localeCode}_` : ""}${videoKey}`;
