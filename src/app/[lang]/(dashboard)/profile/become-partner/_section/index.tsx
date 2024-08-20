"use client";
import { Icon } from "@/components/icons";
import useCustomRouter from "@/hooks/useCustomRouter";
import { Button, Divider, IconButton, Stack, Typography } from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Image from "@/components/Image";
import CustomDialog from "@/components/CustomDialog";
import { useModalActivation } from "@/hooks/useModalActivation";
import { useGlobalBecomeApartnerServiceGetGlobalsBecomeApartner } from "@cms/queries";
import { useParams } from "next/navigation";

const BecomePartnerDialog = () => {
  const { lang } = useParams();
  const { push, back } = useCustomRouter();
  const open = useModalActivation("/become-partner/");
  const { data } = useGlobalBecomeApartnerServiceGetGlobalsBecomeApartner({ locale: lang as string });

  return (
    <CustomDialog fullWidth maxWidth="sm" aria-labelledby="become" open={open} onClose={back}>
      <DialogTitle sx={{ m: 0, p: 2 }} id="change-password-dialog">
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack direction={"row"} alignItems="center" spacing={1}>
            <Typography variant="h4-semi-bold" color={"common.white"}>
              {data?.title}
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
          <Typography variant="p2-regular">{data?.text}</Typography>
          <Button onClick={() => push("kyc-info")}>{data?.button}</Button>
        </Stack>
      </DialogContent>
    </CustomDialog>
  );
};

export default BecomePartnerDialog;
