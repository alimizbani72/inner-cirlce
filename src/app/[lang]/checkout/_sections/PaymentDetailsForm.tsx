"use client";

import { type ChangeEvent, useMemo, useState, type FC } from "react";
import { RHFCheckbox, RHFTextField } from "@/components/hook-form";
import FormProvider from "@/components/hook-form/form-provider";
import * as Yup from "yup";
import { LoadingButton } from "@mui/lab";
import { Box, Divider, FormControlLabel, Radio, RadioGroup, Stack, Typography } from "@mui/material";
import { Icon } from "@/components/icons";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppRouter } from "@/routes/hooks";
import { useAppSelector } from "@/lib/hooks";
import { selectUser } from "@/lib/features/user/userSlice";
import { useTranslate } from "@/locales";
import Link from "@/components/Link";
import Image from "@/components/Image";
import {
  useFinancialServiceBillingAddressCreateMutation,
  useFinancialServiceBillingAddressQuery,
  useFinancialServiceFinancialPayCreateMutation,
} from "@minecraft/queries";
import { enqueueSnackbar } from "notistack";
import { usePathname } from "next/navigation";

const currencyList = ["USDC", "DAI", "USDT", "USDC.E"];
interface PaymentDetailsFormProps {
  planType: string;
}
const PaymentDetailsForm: FC<PaymentDetailsFormProps> = ({ planType }) => {
  const { replace } = useAppRouter();
  const pathname = usePathname();
  const userInfo = useAppSelector(selectUser);
  const { t } = useTranslate();
  const { data: billingData } = useFinancialServiceBillingAddressQuery();

  const { mutateAsync: billingAddress, isPending: isBillingPending } =
    useFinancialServiceBillingAddressCreateMutation();
  const { mutateAsync: createPay, isPending: isPayPending } = useFinancialServiceFinancialPayCreateMutation();
  const [selectedCurrency, setSelectedCurrency] = useState(currencyList?.[0]);

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
    defaultValues: {
      email: billingData?.data?.email_address || userInfo?.email || "",
      first_name: billingData?.data?.first_name || "",
      last_name: billingData?.data?.last_name || "",
      zip_code: billingData?.data?.zipcode || "",
      country: billingData?.data?.country || "",
      city: billingData?.data?.city || "",
      address: billingData?.data?.address || "",
      terms: false,
    },
    mode: "onSubmit",
  });

  const { handleSubmit, watch } = methods;
  const { terms } = watch();
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedCurrency(event.target.value);
    replace(`${pathname}/?plan_type=${planType}&symbol=${event.target.value}`);
  };

  const onSubmit = handleSubmit(async (data) => {
    //TODO: FIX TYPES HERE
    billingAddress({ requestBody: { ...data, email_address: userInfo?.email } } as any)
      .then(() => {
        createPay({ requestBody: { plan_type: planType, symbol: selectedCurrency || "USDC" } })
          .then((response: any) => {
            replace(`/checkout/qr-wallet?plan_type=${planType}&id=${response?.data?.id}`);
          })
          .catch((error) => {
            enqueueSnackbar({ message: error?.body?.message || "An error occurred", variant: "error" });
          });
      })
      .catch(() => enqueueSnackbar(t("formErrors.formError"), { variant: "error" }));
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
          <Stack spacing={1}>
            <Typography>{t("checkout.paymentMethod")}</Typography>
            <Stack alignItems={"center"} sx={{ textAlign: "center" }} gap={1}>
              <RadioGroup
                sx={{ flexDirection: "row", flexWrap: "wrap", gap: 2, width: "100%" }}
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
          </Stack>
        </Stack>

        {/* button section */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          alignItems={{ xs: "start", md: "center" }}
          spacing={3}
          pl={1}
          sx={{ mt: 4 }}
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
          <LoadingButton
            disabled={!terms}
            color="primary"
            size="large"
            type="submit"
            sx={{ width: "100%" }}
            loading={isBillingPending || isPayPending}
          >
            {t("checkout.payNow")}
          </LoadingButton>
        </Stack>
      </FormProvider>

      {/* PoweredByChainMind section only visible on mobile */}
      <Stack display={{ xs: "flex", md: "none" }} direction={"row"} justifyContent={"center"} spacing={3} pt={4}>
        <Typography variant="caption-semi-bold">{t("checkout.PoweredByChainMind")}</Typography>
        <Divider
          orientation="vertical"
          flexItem
          sx={{ border: "1.5px solid rgba(255, 255, 255, 0.08)", height: "16px" }}
        />
        <Typography variant="caption-medium">{t("checkout.legal")}</Typography>
      </Stack>
    </Box>
  );
};

export default PaymentDetailsForm;
