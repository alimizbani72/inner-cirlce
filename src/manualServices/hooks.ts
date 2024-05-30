// generated with @7nohe/openapi-react-query-codegen@1.3.0

import { type UseMutationOptions, useMutation } from "@tanstack/react-query";
import type * as Common from "./common";
import { DefaultService } from "./services";

/**
 * Upload
 * @param data The data for the request.
 * @param data.formData
 * @returns unknown Successful operation
 * @throws ApiError
 */
export const useDefaultServicePostApiV1FilesUpload = <
  TData = Common.DefaultServicePostApiV1FilesUploadMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        formData?: { files?: Blob | File };
      },
      TContext
    >,
    "mutationFn"
  >
) =>
  useMutation<
    TData,
    TError,
    {
      formData?: { files?: Blob | File };
    },
    TContext
  >({
    mutationFn: ({ formData }) => DefaultService.postApiV1FilesUpload({ formData }) as unknown as Promise<TData>,
    ...options,
  });
