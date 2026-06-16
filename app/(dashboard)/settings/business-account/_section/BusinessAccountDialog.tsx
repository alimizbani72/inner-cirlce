import CustomDialog from "@/components/CustomDialog";
import { RHFTextField } from "@/components/hook-form";
import FormProvider from "@/components/hook-form/form-provider";
import Icon from "@/components/icon";
import LoadingButton from "@/components/loading-button";
import { Scrollbar } from "@/components/scrollbar";
import { useTranslate } from "@/locales";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { type FC, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import zod from "zod";

interface BusinessAccountDialogProps {
  close: VoidFunction;
  open: boolean;
}

const BusinessAccountDialog: FC<BusinessAccountDialogProps> = ({
  open,
  close,
}) => {
  const { t } = useTranslate();
  // const { data } = useGetMe();
  // const userInfo = data?.data;

  const [isPending, setIsPending] = useState(false);

  const userInfo = {
    business_info: {
      address: "Tehran, Valiasr Street",
      city: "Tehran",
      company_name: "Mock Company LTD",
      country: "Iran",
      email: "mock@email.com",
      holder_name: "John Doe",
      zip_code: "123456",
      vat_number: "VAT-999",
      registration_number: "REG-12345",
    },
  };

  const UpdateUserSchema = zod.object({
    holder_name: zod.string().nonempty(t("businessAccount.isrequired")),
    company_name: zod.string().nonempty(t("businessAccount.isrequired")),
    email: zod.string().email().nonempty(t("businessAccount.isrequired")),
    country: zod.string().nonempty(t("businessAccount.isrequired")),
    city: zod.string().nonempty(t("businessAccount.isrequired")),
    zip_code: zod.string().nonempty(t("businessAccount.isrequired")),
    address: zod.string().nonempty(t("businessAccount.isrequired")),
    registration_number: zod.string().nonempty(t("businessAccount.isrequired")),
    vat_number: zod.string(),
  });

  const methods = useForm({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: {
      address: userInfo?.business_info?.address || "",
      city: userInfo?.business_info?.city || "",
      company_name: userInfo?.business_info?.company_name || "",
      country: userInfo?.business_info?.country || "",
      email: userInfo?.business_info?.email || "",
      holder_name: userInfo?.business_info?.holder_name || "",
      zip_code: userInfo?.business_info?.zip_code || "",
      vat_number: userInfo?.business_info?.vat_number || "",
      registration_number: userInfo?.business_info?.registration_number || "",
    },
    mode: "onSubmit",
  });

  const onSubmit = methods.handleSubmit(async (data) => {
    try {
      setIsPending(true);

      await new Promise((res) => setTimeout(res, 800));

      console.log("MOCK PATCH BUSINESS INFO:", data);

      toast.success(t("businessAccount.submittedsuccessmessage"));
      close();
    } catch (_e) {
      toast.error(t("formErrors.formError"));
    } finally {
      setIsPending(false);
    }
  });
  return (
    <CustomDialog fullWidth maxWidth="sm" open={open} onClose={close}>
      <DialogTitle sx={{ m: 0, p: 2 }} id="profile-dialog">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack direction={"row"} alignItems="center" spacing={1}>
            <Typography variant="h4-semi-bold" color={"common.white"}>
              {t("businessAccount.businessAccount")}
            </Typography>
          </Stack>

          <IconButton onClick={close}>
            <Icon name="CloseIcon" />
          </IconButton>
        </Stack>
      </DialogTitle>
      <Divider />

      <Scrollbar>
        <DialogContent dividers sx={{ p: 3 }}>
          <Stack>
            <Typography variant="p2-medium">
              <Typography
                variant="p2-bold"
                textTransform="uppercase"
                color="warning.main"
              >
                {t("businessAccount.note")}:
              </Typography>{" "}
              {t("businessAccount.provideCorrectData")}
            </Typography>
            <FormProvider
              methods={methods}
              sx={{ gap: 3, width: "100%", mt: 3 }}
            >
              <Stack direction={{ md: "row" }} gap={3}>
                <RHFTextField
                  name="holder_name"
                  label={`${t("businessAccount.accountholdername")} *`}
                  placeholder={t(
                    "businessAccount.AccountholdernamePlaceholder",
                  )}
                />
                <RHFTextField
                  name="company_name"
                  label={`${t("businessAccount.companyname")} *`}
                  placeholder={t("businessAccount.companynamePlaceholder")}
                />
              </Stack>
              <Stack direction={{ md: "row" }} gap={3}>
                <RHFTextField
                  name="email"
                  label={`${t("businessAccount.email")} *`}
                  placeholder={t("businessAccount.emailPlaceholder")}
                />
                <RHFTextField
                  name="country"
                  label={`${t("billinghistory.country")} *`}
                  placeholder={t("billinghistory.countryPlaceHolder")}
                />
              </Stack>
              <Stack direction={{ md: "row" }} gap={3}>
                <RHFTextField
                  name="city"
                  label={`${t("billinghistory.city")} *`}
                  placeholder={t("billinghistory.cityPlaceHolder")}
                />
                <RHFTextField
                  name="zip_code"
                  label={`${t("billinghistory.zipCode")} *`}
                  placeholder={t("billinghistory.zipCodePlaceHolder")}
                />
              </Stack>
              <RHFTextField
                name="address"
                label={`${t("billinghistory.address")} *`}
                placeholder={t("billinghistory.addressPlaceHolder")}
              />
              <Stack direction={{ md: "row" }} gap={3}>
                <RHFTextField
                  name="registration_number"
                  label={`${t("businessAccount.companyregistrationnumber")} *`}
                  placeholder={t(
                    "businessAccount.companyregistrationplaceholder",
                  )}
                />
                <RHFTextField
                  name="vat_number"
                  label="VAT number"
                  placeholder="Enter VAT number"
                />
              </Stack>
            </FormProvider>
          </Stack>
        </DialogContent>
      </Scrollbar>
      <DialogActions sx={{ p: 3 }}>
        <Stack
          flex={1}
          direction={"row"}
          gap={2}
          justifyContent="space-between"
        >
          <Button color="tertiary" onClick={close}>
            {t("button.cancel")}
          </Button>
          <LoadingButton onClick={onSubmit} loading={isPending}>
            {userInfo?.business_info?.address
              ? t("button.saveChanges")
              : t("button.submit")}
          </LoadingButton>
        </Stack>
      </DialogActions>
    </CustomDialog>
  );
};

export default BusinessAccountDialog;
