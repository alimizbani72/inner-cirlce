"use client";

import { useMemo, type FC } from "react";
import { RHFCheckbox, RHFTextField } from "@/components/hook-form";
import FormProvider from "@/components/hook-form/form-provider";
import * as Yup from "yup";
import { LoadingButton } from "@mui/lab";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { Icon } from "@/components/icons";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppRouter } from "@/routes/hooks";
import { useAppSelector } from "@/lib/hooks";
import { selectUser } from "@/lib/features/user/userSlice";
import { useTranslate } from "@/locales";
import Link from "@/components/Link";

const defaultValues = {
  email: "",
  first_name: "",
  last_name: "",
  zip_code: "",
  country: "",
  city: "",
  address: "",
  terms: false,
};

interface PaymentDetailsFormProps {
  planType: string;
  id: string;
}
const PaymentDetailsForm: FC<PaymentDetailsFormProps> = ({ planType, id }) => {
  const { push } = useAppRouter();
  const userInfo = useAppSelector(selectUser);
  const { t } = useTranslate();

  const UpdateUserSchema = useMemo(
    () =>
      Yup.object().shape({
        email: Yup.string(),
        first_name: Yup.string().required(t("formErrors.reqiredFirstName")),
        last_name: Yup.string().required(t("formErrors.reqiredLastName")),
        terms: Yup.boolean().oneOf([true], t("formErrors.reqiredLastName")),
        zip_code: Yup.string().required(t("formErrors.reqiredZipCode")),
        country: Yup.string().required(t("formErrors.reqiredCountry")),
        city: Yup.string().required(t("formErrors.reqiredCity")),
        address: Yup.string().required(t("formErrors.reqiredAddress")),
      }),
    [t]
  );

  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
    mode: "onSubmit",
  });

  const { handleSubmit } = methods;

  const onSubmit = handleSubmit((data) => {
    // biome-ignore lint/suspicious/noConsoleLog: <explanation>
    console.log("🚀 ~ data:", data);

    push(`/checkout/qr-wallet?plan_type=${planType}&id=${id}`);
  });

  return (
    <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <FormProvider methods={methods} onSubmit={onSubmit} sx={{ flexGrow: 1 }}>
        {/* Form Fields */}
        <Stack sx={{ flexGrow: 1, gap: 3 }}>
          <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
            <RHFTextField
              name="email"
              label={t("checkout.email")}
              placeholder={userInfo?.email}
              sx={{ path: { stroke: (theme) => theme.palette.success.main } }}
              InputProps={{ readOnly: true, endAdornment: <Icon name="Check" /> }}
            />
            <RHFTextField
              name="first_name"
              label={t("checkout.firstName")}
              placeholder={t("checkout.firstNamePlaceHolder")}
            />
          </Stack>
          <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
            <RHFTextField
              name="last_name"
              label={t("checkout.lastName")}
              placeholder={t("checkout.lastNamePlaceHolder")}
            />
            <RHFTextField
              name="zip_code"
              label={t("checkout.zipCode")}
              placeholder={t("checkout.zipCodePlaceHolder")}
            />
          </Stack>
          <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
            <RHFTextField name="country" label={t("checkout.country")} placeholder={t("checkout.countryPlaceHolder")} />
            <RHFTextField name="city" label={t("checkout.city")} placeholder={t("checkout.cityPlaceHolder")} />
          </Stack>
          <RHFTextField name="address" label={t("checkout.address")} placeholder={t("checkout.addressPlaceHolder")} />
        </Stack>
        <Stack
          direction={{ xs: "column", md: "row" }}
          alignItems={"center"}
          spacing={3}
          sx={{ mt: { xs: 4, md: "auto" } }}
        >
          <RHFCheckbox
            label={
              <Typography sx={{ textWrap: "nowrap" }}>
                <Typography variant="p2-regular" color="grey.light">
                  {t("checkout.agreeTo")}
                </Typography>{" "}
                <Typography variant="p2-regular" component={Link} href="/terms-and-condition">
                  {t("checkout.termsAndConditions")}
                </Typography>
              </Typography>
            }
            name="terms"
          />
          <LoadingButton color="primary" size="large" type="submit" sx={{ width: "100%" }}>
            {t("checkout.payNow")}
          </LoadingButton>
        </Stack>
        <Stack display={{ xs: "flex", md: "none" }} direction={"row"} justifyContent={"center"} spacing={3} pt={4}>
          <Typography variant="caption-semi-bold">{t("checkout.PoweredByChainMind")}</Typography>
          <Divider
            orientation="vertical"
            flexItem
            sx={{ border: "1.5px solid rgba(255, 255, 255, 0.08)", height: "16px" }}
          />
          <Typography variant="caption-medium">{t("checkout.legal")}</Typography>
        </Stack>
      </FormProvider>
    </Box>
  );
};

export default PaymentDetailsForm;
