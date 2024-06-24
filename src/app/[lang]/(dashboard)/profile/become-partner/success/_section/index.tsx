"use client";
import useCustomRouter from "@/hooks/useCustomRouter";
import { Button, IconButton, Stack, Typography } from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import { Icon } from "@/components/icons";
import CustomDialog from "@/components/CustomDialog";
import { useModalActivation } from "@/hooks/useModalActivation";

const SuccessDialog = () => {
  const open = useModalActivation("/success/");

  const { back } = useCustomRouter();

  // const onSubmit = handleSubmit(async (data) => {
  //   // biome-ignore lint/suspicious/noConsoleLog: <explanation>
  //   console.log(data);

  //   push("kyc-info");
  // });

  return (
    <CustomDialog fullWidth maxWidth="sm" aria-labelledby="success" open={open} onClose={back}>
      <DialogContent dividers sx={{ p: 3 }}>
        <Stack gap={3} alignItems={"center"}>
          <IconButton
            disabled
            sx={{
              "&.Mui-disabled": {
                bgcolor: "#00B171",
              },
              width: "40px !important",
              height: "40px !important",
            }}
          >
            <Icon name="Check" size={40} />
          </IconButton>
          <Stack gap={1} sx={{ textAlign: "center" }}>
            <Typography variant="h4-semi-bold">Your Request Sent!</Typography>
            <Typography variant="p2-regular">
              Admins will review it and send the result to your email in next 24 hours.
            </Typography>
          </Stack>
          <Button color="info" onClick={back}>
            Back To Home
          </Button>
        </Stack>
      </DialogContent>
    </CustomDialog>
  );
};

export default SuccessDialog;
