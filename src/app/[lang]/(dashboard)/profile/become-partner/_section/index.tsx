"use client";
import { Icon } from "@/components/icons";
import useCustomRouter from "@/hooks/useCustomRouter";
import { Button, Divider, IconButton, Stack, Typography } from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Image from "@/components/Image";
import CustomDialog from "@/components/CustomDialog";

const BecomePartnerDialog = () => {
  const { push, back } = useCustomRouter();

  return (
    <CustomDialog fullWidth maxWidth="sm" aria-labelledby="become" open={true} onClose={back}>
      <DialogTitle sx={{ m: 0, p: 2 }} id="change-password-dialog">
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack direction={"row"} alignItems="center" spacing={1}>
            <Typography variant="h4-semi-bold" color={"common.white"}>
              Become a Partner
            </Typography>
          </Stack>

          <IconButton onClick={back}>
            <Icon name="Close" />
          </IconButton>
        </Stack>
      </DialogTitle>
      <Divider />

      <DialogContent dividers sx={{ p: 3 }}>
        <Stack gap={3} justifyContent={"center"} alignItems={"center"}>
          <Image src="/assets/png/partner.png" />
          <Typography variant="p2-regular">
            One of these tunnels directs traffic through the VPN server, while the other bypasses the VPN and goes
            directly to the Internet service provider (ISP). Ultimately, this means that users can choose which apps or
            websites go through the VPN and which ones don’t, providing more control over how their online activity is
            shared.
          </Typography>
          <Button onClick={() => push("personal-info")}>Start Doing Now!</Button>
        </Stack>
      </DialogContent>
    </CustomDialog>
  );
};

export default BecomePartnerDialog;
