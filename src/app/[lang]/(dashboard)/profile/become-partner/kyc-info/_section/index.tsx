"use client";
import { Icon } from "@/components/icons";
import useCustomRouter from "@/hooks/useCustomRouter";
import { Button, DialogActions, Divider, IconButton, Stack, Typography } from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useKycServiceKycVerificationCreateMutation } from "@minecraft/queries";
import { LoadingButton } from "@mui/lab";
import CustomizedSteppers from "@/components/CustomizedSteppers";
import { kycCallback } from "@/consts";
import { usePathname } from "next/navigation";

const KYCInfoDialog = () => {
  const { mutateAsync, isPending } = useKycServiceKycVerificationCreateMutation();

  const pathname = usePathname();

  const { push, back, nativeBack } = useCustomRouter();

  const onSubmit = async () => {
    try {
      const res = await mutateAsync({ requestBody: { redirect_url: kycCallback(pathname) } });
      if (res.data?.verification_url) {
        window.location.href = res.data?.verification_url;
      }
    } catch (_error) {
      // console.log(_error);
    }
  };
  return (
    <>
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
        <Stack gap={3}>
          <CustomizedSteppers activeStep={1} />

          <Divider flexItem />
          <Stack gap={1} justifyContent={"center"} alignItems={"center"} sx={{ textAlign: "center" }}>
            <Icon name="KYC" size={64} />
            <Typography variant="p2-regular">
              To complete your registration, you will need to complete the KYC process. You will need to provide
              identity documents and other necessary information.
            </Typography>
            <LoadingButton color="primary" onClick={onSubmit} sx={{ mt: 2 }} loading={isPending}>
              Do KYC Now
            </LoadingButton>
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Stack width={"100%"} direction={"row"} justifyContent={"space-between"}>
          <Button color="info" onClick={nativeBack}>
            Back
          </Button>
          <LoadingButton color="primary" onClick={() => push("/profile/become-partner/2fa")}>
            Next Step
          </LoadingButton>
        </Stack>
      </DialogActions>
    </>
  );
};

export default KYCInfoDialog;
