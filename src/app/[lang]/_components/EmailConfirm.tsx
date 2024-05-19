import { Button, Stack, Typography } from "@mui/material";
import type { FC } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { RHFCode } from "@/components/hook-form";
import FormProvider from "@/components/hook-form/form-provider";

import * as Yup from "yup";
import { useTimer } from "react-timer-hook";
import { toNumber } from "@/utils/toNumber";
import { useTranslate } from "@/locales";
import { Icon } from "@/components/icons";

const UpdateUserSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .test("invalid character", "Your name can't contain numbers", (val) => !/\d/.test(val)),
  checkbox: Yup.boolean(),
});

const defaultValues = {
  name: "",
  checkbox: false,
};

const EmailConfirm: FC = () => {
  const { t } = useTranslate();
  const time = new Date();
  time.setSeconds(time.getSeconds() + toNumber(90));
  const { minutes, seconds, totalSeconds } = useTimer({ expiryTimestamp: time });

  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
    mode: "onSubmit",
  });

  const { handleSubmit } = methods;

  const onSubmit = handleSubmit((data) => {
    // biome-ignore lint/suspicious/noConsoleLog: <explanation>
    console.log("🚀 ~ data:", data);
  });
  return (
    <>
      <Stack spacing={1}>
        <Icon name="Mailbox--colorful" size={64} />
        <Typography variant="h3-semi-bold" sx={{ mt: 1 }}>
          {t("emailVerification.title")}
        </Typography>
        <Typography variant="p2-regular" color="grey.light">
          {t("emailVerification.subtitle")}{" "}
          <Typography variant="p2-regular" component={"span"}>
            {t("emailVerification.placeholderEmail")}
          </Typography>
        </Typography>
      </Stack>

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <RHFCode name="verifyCode" label={t("emailVerification.verifyCodeLabel")} />
      </FormProvider>
      <Stack direction={"row"} spacing={2} alignItems={"center"}>
        <Button fullWidth color="info">
          {t("emailVerification.backButton")}
        </Button>
        {totalSeconds ? (
          <Typography sx={{ width: "100%", textAlign: "center" }} color="grey.light" variant="p2-medium">
            {`${t("emailVerification.resendWithTimer")} (${minutes.toString().padStart(2, "0")}:${seconds
              .toString()
              .padStart(2, "0")})`}
          </Typography>
        ) : (
          <Typography
            sx={{ width: "100%", textAlign: "center", cursor: "pointer" }}
            color="blue.light"
            variant="p2-medium"
          >
            {t("emailVerification.resend")}
          </Typography>
        )}
      </Stack>
      <Typography variant="p2-regular" color="grey.light">
        {t("emailVerification.checkSpam")}
      </Typography>
    </>
  );
};
export default EmailConfirm;
