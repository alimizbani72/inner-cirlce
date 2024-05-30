import type { DefaultService } from "./services";

export const useDefaultServiceGetApiV1FilesDownloadByKeyKey = "DefaultServiceGetApiV1FilesDownloadByKey";
export const UseDefaultServiceGetApiV1FilesDownloadByKeyKeyFn = (
  {
    formData,
  }: {
    formData?: unknown;
  } = {},
  queryKey?: Array<unknown>
) => [useDefaultServiceGetApiV1FilesDownloadByKeyKey, ...(queryKey ?? [{ formData }])];
export type DefaultServicePostApiV1FilesUploadMutationResult = Awaited<
  ReturnType<typeof DefaultService.postApiV1FilesUpload>
>;
