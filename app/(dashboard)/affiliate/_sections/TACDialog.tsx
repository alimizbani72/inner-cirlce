"use client";

import CustomDialog from "@/components/CustomDialog";
import LoadingButton from "@/components/loading-button";
import {
  Checkbox,
  DialogActions,
  DialogTitle,
  Divider,
  FormControlLabel,
  Stack,
  Typography,
} from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import dynamic from "next/dynamic";
import { type FC, useState } from "react";
import { toast } from "sonner";

import { Scrollbar } from "@/components/scrollbar";
import { useTranslate } from "@/locales";

const CMSContentParser = dynamic(
  () => import("@app-components/CMSContentParser"),
  { ssr: false },
);

type Props = {
  close: VoidFunction;
  open: boolean;
};

const TACDialog: FC<Props> = ({ close, open }) => {
  const { t } = useTranslate();
  const [value, setValue] = useState(false);

  const [isPending, setIsPending] = useState(false);

  // ✅ dummy CMS data
  const data = {
    data: {
      layout: [
        {
          type: "text",
          content: `
          <h2>Affiliate Terms & Conditions</h2>
          <p>1. You agree to follow platform rules.</p>
          <p>2. Affiliate rewards may change anytime.</p>
          <p>3. Fraud will result in account suspension.</p>
        `,
        },
      ],
    },
  };

  const handleSubmit = async () => {
    try {
      setIsPending(true);

      // simulate API delay
      await new Promise((res) => setTimeout(res, 800));

      close();
      toast.success(t("tacDialog.success"));
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <CustomDialog
      disableEscapeKeyDown
      onClose={(_event, reason) => {
        if (reason !== "backdropClick") {
          close();
        }
      }}
      fullWidth
      maxWidth="md"
      open={open}
    >
      <DialogTitle>
        <Stack direction="row" justifyContent="space-between">
          <Stack gap={1} mr={{ md: undefined, xs: 4 }}>
            <Typography variant="h4-semi-bold">
              {t("tacDialog.title")}
            </Typography>
          </Stack>
          {/* <IconButton onClick={close} sx={{ mt: { xs: 0.5, md: 1 } }}>
            <Icon name="CloseIcon" />
          </IconButton> */}
        </Stack>
      </DialogTitle>
      <Divider />
      <Scrollbar>
        <DialogContent>
          <Stack gap={3}>
            <CMSContentParser layout={data?.data?.layout as any} />
          </Stack>
        </DialogContent>
      </Scrollbar>
      <DialogActions sx={{ p: 3 }}>
        <Stack
          flex={1}
          direction={{ md: "row" }}
          gap={2}
          justifyContent="space-between"
        >
          <FormControlLabel
            value={value}
            onChange={(_event, checked) => setValue(checked)}
            control={<Checkbox />}
            label={t("tacDialog.description")}
          />
          <LoadingButton
            disabled={!value}
            onClick={handleSubmit}
            loading={isPending}
          >
            {t("tacDialog.btn")}
          </LoadingButton>
        </Stack>
      </DialogActions>
    </CustomDialog>
  );
};

export default TACDialog;
