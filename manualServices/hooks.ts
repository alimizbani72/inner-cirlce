// generated with @7nohe/openapi-react-query-codegen@1.3.0

import { type UseMutationOptions, useMutation } from '@tanstack/react-query';
import { DefaultService } from './services';
import type { DefaultServicePostApiV1FilesUploadMutationResult } from './types';

/**
 * Upload
 * @param data The data for the request.
 * @param data.formData
 * @returns unknown Successful operation
 * @throws ApiError
 */
export const useDefaultServicePostApiV1FilesUpload = <
  TData = DefaultServicePostApiV1FilesUploadMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        formData?: { file?: Blob | File };
      },
      TContext
    >,
    'mutationFn'
  >
) =>
  useMutation<
    TData,
    TError,
    {
      formData?: { file?: Blob | File };
    },
    TContext
  >({
    mutationFn: ({ formData }) =>
      DefaultService.postApiV1FilesUpload({ formData }) as unknown as Promise<TData>,
    ...options,
  });
