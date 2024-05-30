import type { DefaultService } from "./services";

export type PostApiV1FilesUploadData = {
  formData?: {
    files?: Blob | File;
  };
};

export type PostApiV1FilesUploadResponse = unknown;

export type DefaultServicePostApiV1FilesUploadMutationResult = Awaited<
  ReturnType<typeof DefaultService.postApiV1FilesUpload>
>;

export type $OpenApiTs = {
  "/api/v1/files/upload": {
    post: {
      req: {
        formData?: {
          files?: Blob | File;
        };
      };
      res: {
        /**
         * Successful operation
         */
        200: unknown;
      };
    };
  };
};
