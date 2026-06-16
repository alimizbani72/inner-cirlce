"use client";

import { RHFCheckbox, RHFTextField } from "@/components/hook-form";
import FormProvider from "@/components/hook-form/form-provider";
import Icon from "@/components/icon";
import { useTranslate } from "@/locales";
import { useAppRouter, usePathname } from "@/routes/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import { type ChangeEvent, type FC, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import zod from "zod";

import { Image } from "@/components/image";
import Link from "@/components/link";
import LoadingButton from "@/components/loading-button";
import { useIsMobile } from "@/hooks/use-responsive";

import { useGetMe } from "@/services/minecraft/default/default";
import { toast } from "sonner";

const currencyList = ["USDC", "DAI", "USDT", "USDC.E"];

interface PaymentDetailsFormProps {
  planType: string;
}

/* ---------------- DUMMY DATA ---------------- */

const dummyBilling = {
  email_address: "demo@example.com",
  first_name: "Ali",
  last_name: "Mizbani",
  zipcode: "12345",
  country: "Turkey",
  city: "Istanbul",
  address: "Kadikoy",
};

/* ---------------- FAKE API ---------------- */

const delay = (ms = 700) => new Promise((r) => setTimeout(r, ms));

const fakeBillingSave = async () => {
  await delay();
  return true;
};

const fakeCreatePay = async () => {
  await delay();
  return {
    data: { id: "dummy-payment-id" },
  };
};

/* ---------------- COMPONENT ---------------- */

const PaymentDetailsForm: FC<PaymentDetailsFormProps> = ({ planType }) => {
  const { replace } = useAppRouter();
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const { t } = useTranslate();

  // ✅ KEEP REAL HOOK
  const { data } = useGetMe();
  const userInfo = data?.data;

  const [selectedCurrency, setSelectedCurrency] = useState(currencyList[0]);

  const schema = useMemo(
    () =>
      zod.object({
        email: zod.string(),
        first_name: zod.string().nonempty(t("formErrors.reqiredFirstName")),
        last_name: zod.string().nonempty(t("formErrors.reqiredLastName")),
        zip_code: zod.string().nonempty(t("formErrors.reqiredZipCode")),
        country: zod.string().nonempty(t("formErrors.reqiredCountry")),
        city: zod.string().nonempty(t("formErrors.reqiredCity")),
        address: zod.string().nonempty(t("formErrors.reqiredAddress")),
        terms: zod.boolean(),
      }),
    [t],
  );

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: userInfo?.email || dummyBilling.email_address,
      first_name: dummyBilling.first_name,
      last_name: dummyBilling.last_name,
      zip_code: dummyBilling.zipcode,
      country: dummyBilling.country,
      city: dummyBilling.city,
      address: dummyBilling.address,
      terms: false,
    },
  });

  const { handleSubmit, watch, reset } = methods;
  const { terms } = watch();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedCurrency(value);
    replace(`${pathname}/?plan_type=${planType}&symbol=${value}`);
  };

  const onSubmit = handleSubmit(async () => {
    try {
      await fakeBillingSave();

      const res = await fakeCreatePay();

      replace(`/checkout/qr-wallet?plan_type=${planType}&id=${res.data.id}`);

      toast.success("Payment created (dummy mode)");
    } catch {
      toast.error("Something went wrong");
    }
  });

  useEffect(() => {
    reset({
      email: userInfo?.email || dummyBilling.email_address,
      first_name: dummyBilling.first_name,
      last_name: dummyBilling.last_name,
      zip_code: dummyBilling.zipcode,
      country: dummyBilling.country,
      city: dummyBilling.city,
      address: dummyBilling.address,
      terms: false,
    });
  }, [userInfo, reset]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <FormProvider methods={methods} onSubmit={onSubmit} sx={{ flexGrow: 1 }}>
        <Stack sx={{ flexGrow: 1, gap: 3 }}>
          {/* EMAIL + FIRST NAME */}
          <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
            <RHFTextField
              name="email"
              label={t("checkout.email")}
              slotProps={{
                input: {
                  readOnly: true,
                  endAdornment: <Icon name="CheckIcon" />,
                },
              }}
            />
            <RHFTextField name="first_name" label={t("checkout.firstName")} />
          </Stack>

          {/* LAST NAME + ZIP */}
          <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
            <RHFTextField name="last_name" label={t("checkout.lastName")} />
            <RHFTextField name="zip_code" label={t("checkout.zipCode")} />
          </Stack>

          {/* COUNTRY + CITY */}
          <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
            <RHFTextField name="country" label={t("checkout.country")} />
            <RHFTextField name="city" label={t("checkout.city")} />
          </Stack>

          <RHFTextField name="address" label={t("checkout.address")} />

          {/* PAYMENT METHOD */}
          <Stack spacing={1}>
            <Typography>{t("checkout.paymentMethod")}</Typography>

            <RadioGroup
              value={selectedCurrency}
              onChange={handleChange}
              sx={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 2,
                width: "100%",
              }}
            >
              {currencyList.map((currency) => (
                <FormControlLabel
                  key={currency}
                  value={currency}
                  control={<Radio />}
                  label={
                    <Stack direction="row" gap={1}>
                      <Image
                        src={`/assets/currencies/${currency}.svg`}
                        alt={currency}
                      />
                      <Typography variant="p2-medium">{currency}</Typography>
                    </Stack>
                  }
                  sx={{
                    flex: "1 1 45%",
                    p: 2,
                    borderRadius: 2,
                    bgcolor:
                      currency === selectedCurrency ? "dark.3" : "dark.2",
                  }}
                />
              ))}
            </RadioGroup>
          </Stack>

          {/* TERMS */}
          <Stack>
            <RHFCheckbox
              name="terms"
              label={
                <Typography sx={{ textWrap: "nowrap" }}>
                  <Typography variant="p2-regular" color="grey.light">
                    {t("checkout.agreeTo")}
                  </Typography>{" "}
                  <Typography
                    variant="p2-regular"
                    component={Link}
                    href="/terms-and-condition"
                  >
                    {t("checkout.termsAndConditions")}
                  </Typography>{" "}
                  {!isMobile && (
                    <Typography variant="p2-regular" color="grey.light">
                      {t("checkout.areclearandIagreeto")}
                    </Typography>
                  )}
                </Typography>
              }
            />
          </Stack>
        </Stack>

        {/* BUTTON */}
        <Stack sx={{ mt: 3 }}>
          <LoadingButton type="submit" disabled={!terms} fullWidth>
            {t("checkout.payNow")}
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Box>
  );
};

export default PaymentDetailsForm;
