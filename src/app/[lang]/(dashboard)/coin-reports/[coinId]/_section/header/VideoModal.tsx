"use client";

import { Icon } from "@/components/icons";
import DialogTitle from "@mui/material/DialogTitle";
import CustomDialog from "@/components/CustomDialog";
import DialogContent from "@mui/material/DialogContent";
import { Divider, IconButton, Stack, Typography } from "@mui/material";
import type { FC } from "react";
import VimeoPlayer from "@/components/VimeoPlayer";

type Props = {
  close: VoidFunction;
  open: boolean;
  videoLink: string;
  title: string;
};

const VideoModal: FC<Props> = ({ close, open, videoLink, title }) => {
  return (
    <CustomDialog fullWidth maxWidth="sm" onClose={close} aria-labelledby="Video-dialog" open={open}>
      <DialogTitle sx={{ m: 0, p: 2 }} id="Video-dialog">
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h4-semi-bold" color={"common.white"}>
            {title}
          </Typography>
          <IconButton onClick={close}>
            <Icon name="Close" />
          </IconButton>
        </Stack>
      </DialogTitle>
      <Divider />
      <DialogContent dividers sx={{ p: 3 }}>
        {videoLink && (
          <VimeoPlayer
            key={videoLink}
            sx={{
              iframe: {
                borderRadius: 2,
                aspectRatio: 16 / 9,
                width: { md: "100% !important", xs: "calc(100vw - 48px) !important" },
                height: "auto !important",
              },
            }}
            videoUrl={videoLink}
          />
        )}
      </DialogContent>
    </CustomDialog>
  );
};

export default VideoModal;
