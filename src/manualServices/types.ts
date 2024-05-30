export type PostApiV1FilesUploadData = {
  formData?: {
    files?: Blob | File;
  };
};

export type PostApiV1FilesUploadResponse = unknown;

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
