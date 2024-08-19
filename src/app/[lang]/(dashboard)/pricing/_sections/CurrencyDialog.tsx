"use client";
import CustomDialog from "@/components/CustomDialog";
import DialogContent from "@mui/material/DialogContent";
import {
  DialogActions,
  DialogTitle,
  Divider,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import { type ChangeEvent, useState, type FC } from "react";
import { Icon } from "@/components/icons";
import Image from "@/components/Image";
import { LoadingButton } from "@mui/lab";

type Props = {
  onClose: VoidFunction;
  open: string;
  handlePay: (plan_type: string, currency: string) => Promise<void>;
  isPending: boolean;
};

const currencyList = ["USDC", "DAI", "USDT", "USDC.E"];

const CurrencyDialog: FC<Props> = ({ onClose, open, handlePay, isPending }) => {
  const [selectedCurrency, setSelectedCurrency] = useState(currencyList?.[0]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedCurrency(event.target.value);
  };
  return (
    <CustomDialog fullWidth maxWidth="sm" onClose={onClose} open={!!open}>
      <DialogTitle sx={{ m: 0, p: 2 }} id="change-password-dialog">
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack direction={"row"} alignItems="center" spacing={1}>
            <Typography variant="h4-semi-bold" color={"common.white"}>
              Gateway Payment
            </Typography>
          </Stack>

          <IconButton onClick={onClose}>
            <Icon name="Close" />
          </IconButton>
        </Stack>
      </DialogTitle>
      <Divider />

      <DialogContent dividers sx={{ p: 3 }}>
        <Stack justifyContent={"center"} alignItems={"center"} sx={{ px: 3, textAlign: "center" }} gap={1}>
          <RadioGroup
            sx={{ flexDirection: "row", flexWrap: "wrap", gap: 2 }}
            defaultValue={currencyList?.[0]}
            value={selectedCurrency}
            onChange={handleChange}
          >
            {currencyList.map((currency) => (
              <FormControlLabel
                key={currency}
                sx={{
                  flex: "1 1 45%",
                  mx: 0,
                  justifyContent: "space-between",
                  bgcolor: currency === selectedCurrency ? "dark.3" : "dark.2",
                  borderRadius: "12px",
                  border: "1.5px solid",
                  borderColor: "dark.3",
                  p: 2,
                  height: "56px",
                }}
                labelPlacement="start"
                value={currency}
                control={<Radio disableTouchRipple disableRipple />}
                label={
                  <Stack direction={"row"} gap={1}>
                    <Image src={`/assets/currencies/${currency}.svg`} alt={currency} />
                    <Typography variant="p2-medium">{currency}</Typography>
                  </Stack>
                }
              />
            ))}
          </RadioGroup>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Stack width="100%" direction="row" justifyContent="flex-end">
          <LoadingButton
            loading={isPending}
            size="large"
            disabled={!selectedCurrency}
            onClick={() => {
              handlePay(open, selectedCurrency);
            }}
          >
            Continue
          </LoadingButton>
        </Stack>
      </DialogActions>
    </CustomDialog>
  );
};

export default CurrencyDialog;
