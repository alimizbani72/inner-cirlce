import { useSnackbar } from "notistack";
import { useState } from "react";
// ----------------------------------------------------------------------

type CopiedValue = string | null;

type CopyFn = (text: string) => Promise<boolean>;

type ReturnType = {
  copy: CopyFn;
  copiedText: CopiedValue;
};

export function useCopyToClipboard(): ReturnType {
  const [copiedText, setCopiedText] = useState<CopiedValue>(null);
  const { enqueueSnackbar } = useSnackbar();
  const copy: CopyFn = async (text) => {
    if (!navigator?.clipboard) {
      enqueueSnackbar("Clipboard not supported", {
        variant: "error",
      });
      return false;
    }

    // Try to save to clipboard then save it in the state if worked
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      enqueueSnackbar("Copied successfully", {
        variant: "success",
      });
      return true;
    } catch (_error) {
      enqueueSnackbar("Copy failed", {
        variant: "error",
      });
      setCopiedText(null);
      return false;
    }
  };

  return { copiedText, copy };
}
