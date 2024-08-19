"use client";

import { useState, type FC } from "react";
import { RHFTextField } from "@/components/hook-form";
import FormProvider from "@/components/hook-form/form-provider";
import * as Yup from "yup";
import { LoadingButton } from "@mui/lab";
import { Box, Stack, Typography } from "@mui/material";
import { Icon } from "@/components/icons";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import RadioBox from "./RadioBox";
import { useAppRouter } from "@/routes/hooks";
import { useAppSelector } from "@/lib/hooks";
import { selectUser } from "@/lib/features/user/userSlice";

const UpdateUserSchema = Yup.object().shape({
  email: Yup.string(),
  first_name: Yup.string(),
  last_name: Yup.string(),
  checkbox: Yup.boolean(),
});

const defaultValues = {
  email: "",
  first_name: "",
  last_name: "",
  checkbox: false,
};

interface PaymentDetailsFormProps {}

const PaymentDetailsForm: FC<PaymentDetailsFormProps> = () => {
  const { push } = useAppRouter();
  const [paymentMethod, setPaymentMethod] = useState<1 | 2>(1);
  const userInfo = useAppSelector(selectUser);

  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
    mode: "onSubmit",
  });

  const { handleSubmit } = methods;

  const onSubmit = handleSubmit((data) => {
    // biome-ignore lint/suspicious/noConsoleLog: <explanation>
    console.log("🚀 ~ data:", data);
    if (paymentMethod === 1) {
      push("/checkout/qr-wallet");
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit} sx={{ gap: 3 }}>
      <RHFTextField
        name="email"
        label="Email Address"
        placeholder={userInfo?.email}
        sx={{ path: { stroke: (theme) => theme.palette.success.main } }}
        InputProps={{ readOnly: true, endAdornment: <Icon name="Check" /> }}
      />

      <RHFTextField name="first_name" label="First Name" placeholder="Enter your first name" />

      <RHFTextField name="last_name" label="Last name" placeholder="Enter your last name" />

      <Stack gap={1} mb={1}>
        <Typography mb={1} variant="caption-semi-bold" textTransform={"uppercase"}>
          Payment Method
        </Typography>

        <RadioBox
          checked={paymentMethod === 1}
          label="QR Code or Wallet Address"
          icon={"Question"}
          onClick={() => setPaymentMethod(1)}
        />

        <RadioBox
          checked={paymentMethod === 2}
          label="Connect Wallet Directly"
          icon={"Wallet"}
          onClick={() => setPaymentMethod(2)}
        />
      </Stack>

      <Box>
        <Typography color={"grey.light"} variant="p2-regular">
          We use your personal data to process your order and enhance experience as described in our
          <Typography color={"white"} variant="p2-regular">
            {" "}
            Privacy Policy.
          </Typography>
        </Typography>
      </Box>
      <LoadingButton color="primary" size="large" type="submit">
        Pay Now
      </LoadingButton>
    </FormProvider>
  );
};

export default PaymentDetailsForm;
