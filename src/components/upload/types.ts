// @mui
import type { SxProps, Theme } from "@mui/material/styles";
import type React from "react";
import type { DropzoneOptions } from "react-dropzone";

// ----------------------------------------------------------------------

export interface ExtendFile extends File {
  preview?: string;
  path?: string;
  lastModifiedDate?: string;
}

export interface CustomFile extends File {
  path?: string;
  preview?: string;
  lastModifiedDate?: Date;
}

export interface UploadProps extends DropzoneOptions {
  error?: boolean;
  sx?: SxProps<Theme>;
  thumbnail?: boolean;
  placeholder?: React.ReactNode;
  helperText?: React.ReactNode;
  disableMultiple?: boolean;
  //
  file?: CustomFile | string | null;
  onDelete?: VoidFunction;
  //
  files?: (File | string)[];
  onUpload?: VoidFunction;
  onRemove?: (file: CustomFile | string) => void;
  onRemoveAll?: VoidFunction;
}
