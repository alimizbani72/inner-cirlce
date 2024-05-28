"use client";

import { Icon } from "@/components/icons";
import DialogTitle from "@mui/material/DialogTitle";
import CustomDialog from "@/components/CustomDialog";
import DialogContent from "@mui/material/DialogContent";
import { Button, DialogActions, Divider, IconButton, InputLabel, Stack, TextField, Typography } from "@mui/material";
import type { FC } from "react";

type Props = {
  close: VoidFunction;
  open: boolean;
};

const WithdrawDialog: FC<Props> = ({ close, open }) => {
  return (
    <CustomDialog fullWidth maxWidth="sm" onClose={close} aria-labelledby="withdraw-dialog" open={open}>
      <DialogTitle sx={{ m: 0, p: 2 }} id="withdraw-dialog">
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h4-semi-bold" color={"common.white"}>
            Withdraw
          </Typography>
          <IconButton onClick={close}>
            <Icon name="Close" />
          </IconButton>
        </Stack>
      </DialogTitle>
      <Divider />

      <DialogContent dividers sx={{ p: 3 }}>
        <Stack gap={3}>
          <Stack gap={0.5}>
            <Typography variant="p2-medium">$4,180.00</Typography>
            <Typography variant="caption-medium" color="grey.light">
              Available for withdraw
            </Typography>
          </Stack>
          <Stack>
            <InputLabel sx={{ typography: "caption-semi-bold", textTransform: "uppercase" }} htmlFor="amount">
              Amount
            </InputLabel>
            <TextField
              id="amount"
              placeholder="Enter the amount"
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            />
          </Stack>
          <Stack>
            <InputLabel sx={{ typography: "caption-semi-bold", textTransform: "uppercase" }} htmlFor="address">
              Address
            </InputLabel>
            <TextField
              id="address"
              placeholder="Enter the amount"
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <Typography variant="p2-medium" color="pink.dark">
                    Change
                  </Typography>
                ),
              }}
              value="ERC-20 : 0x7507......fad68a"
            />
          </Stack>
          <Stack component={"ul"} pl={3}>
            <Typography component={"li"} variant="p2-regular" color="grey.light">
              There will be 3% fee for withdrawal.
            </Typography>
            <Typography component={"li"} variant="p2-regular" color="grey.light">
              The minimum amount for withdrawal are 100 Euro.
            </Typography>
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Stack width={"100%"} direction={"row"} justifyContent={"space-between"}>
          <Button color="info" onClick={close}>
            Cancel
          </Button>
          <Button>Withdraw</Button>
        </Stack>
      </DialogActions>
    </CustomDialog>
  );
};

export default WithdrawDialog;
