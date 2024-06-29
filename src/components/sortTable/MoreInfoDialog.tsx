"use client";

import { Icon } from "@/components/icons";
import DialogTitle from "@mui/material/DialogTitle";
import CustomDialog from "@/components/CustomDialog";
import DialogContent from "@mui/material/DialogContent";
import { Button, DialogActions, Divider, IconButton, Stack, Typography } from "@mui/material";
import { useState, type FC } from "react";
import Link from "../Link";
import type { MoreInfoData } from ".";

type Props = {
  close: VoidFunction;
  open: boolean;
  data: MoreInfoData | null;
};

const MoreInfoDialog: FC<Props> = ({ close, open, data }) => {
  const [isBuyNow, setIsBuyNow] = useState<boolean>(false);

  return (
    <CustomDialog fullWidth maxWidth="sm" onClose={close} aria-labelledby="withdraw-dialog" open={open}>
      <DialogTitle sx={{ m: 0, p: 2 }} id="withdraw-dialog">
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h4-semi-bold" color={"common.white"}>
            {data?.Name}
          </Typography>
          <IconButton onClick={close}>
            <Icon name="Close" />
          </IconButton>
        </Stack>
      </DialogTitle>
      <Divider />

      <DialogContent dividers sx={{ p: 3 }}>
        {/* <VimeoPlayer
          key={`${isBuyNow}`}
          sx={{
            iframe: {
              borderRadius: 2,
              aspectRatio: 16 / 9,
              width: { md: "100% !important", xs: "calc(100vw - 48px) !important" },
              height: "auto !important",
            },
          }}
          videoUrl={isBuyNow ? data?.how_to_buy_video_url : data?.video_url}
        /> */}
        <Typography>Coming Soon</Typography>
      </DialogContent>
      <DialogActions>
        <Stack width={"100%"} direction={"row"} justifyContent={"space-between"}>
          <Button size="large" color="info" endIcon={<Icon name="Arrow-right" />} disabled>
            <Link href={data?.link!} target="_blank" sx={{ color: "white" }}>
              More Information
            </Link>
          </Button>
          {isBuyNow ? (
            <Button size="large" endIcon={<Icon name="Arrow-right" />} disabled>
              <Link href={data?.how_to_buy_link!} sx={{ color: "white" }} target="_blank">
                Buy Now
              </Link>
            </Button>
          ) : (
            <Button size="large" endIcon={<Icon name="Arrow-right" />} onClick={() => setIsBuyNow(true)} disabled>
              How To Buy
            </Button>
          )}
        </Stack>
      </DialogActions>
    </CustomDialog>
  );
};

export default MoreInfoDialog;
