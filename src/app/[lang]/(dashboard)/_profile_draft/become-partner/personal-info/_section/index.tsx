// "use client";
// import { Icon } from "@/components/icons";
// import useCustomRouter from "@/hooks/useCustomRouter";
// import { Button, DialogActions, Divider, IconButton, Stack, Typography } from "@mui/material";
// import DialogContent from "@mui/material/DialogContent";
// import DialogTitle from "@mui/material/DialogTitle";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { useForm } from "react-hook-form";
// import * as Yup from "yup";
// import { useTranslate } from "@/locales";
// import {
//   useAuthServiceMeQueryKey,
//   useUserServiceAccountsPartnerCreateMutation,
//   useWalletServiceWalletCreateMutation,
//   useWalletServiceWalletDefaultQuery,
// } from "@minecraft/queries";
// import FormProvider from "@/components/hook-form/form-provider";
// import { RHFTextField } from "@/components/hook-form";
// import { LoadingButton } from "@mui/lab";
// import { useIsMobile } from "@/hooks/use-responsive";
// import CustomizedSteppers from "@/components/CustomizedSteppers";
// import CustomDialog from "@/components/CustomDialog";
// import { useMemo } from "react";
// import { useModalActivation } from "@/hooks/useModalActivation";
// import { enqueueSnackbar } from "notistack";
// import { getQueryClient } from "@app/_providers/customQueryClient";
// import { useAppSelector } from "@/lib/hooks";
// import { selectUser } from "@/lib/features/user/userSlice";

// const PersonalInfoDialog = () => {
//   const isMobile = useIsMobile();
//   const open = useModalActivation("/personal-info/");
//   const queryClient = getQueryClient();
//   const direction = isMobile ? "column" : "row";
//   const { t } = useTranslate();
//   const userInfo = useAppSelector(selectUser);
//   const { mutateAsync: createWallet } = useWalletServiceWalletCreateMutation();

//   const { mutate: createPartner, isPending } = useUserServiceAccountsPartnerCreateMutation();

//   const defaultValues = useMemo(
//     () => ({
//       fullname: userInfo?.full_name,
//       email: userInfo?.email,
//       country: userInfo?.country,
//       city: userInfo?.city,
//       building: userInfo?.building_number,
//       zipcode: userInfo?.zip_code,
//       street: userInfo?.street,
//       wallet: "",
//     }),
//     [userInfo]
//   );

//   const { push, back, nativeBack } = useCustomRouter();

//   const methods = useForm({
//     resolver: yupResolver(
//       Yup.object().shape({
//         fullname: Yup.string().required(t("formErrors.required")),
//         email: Yup.string().required(t("formErrors.required")),
//         country: Yup.string().required(t("formErrors.required")),
//         city: Yup.string().required(t("formErrors.required")),
//         building: Yup.string().required(t("formErrors.required")),
//         zipcode: Yup.string().required(t("formErrors.required")),
//         wallet: Yup.string()
//           .required(t("formErrors.required"))
//           .matches(/^(0x)?[0-9a-fA-F]{40}$/, t("formErrors.invalidWallet")),
//         street: Yup.string().required(t("formErrors.required")),
//       })
//     ),
//     defaultValues,
//     mode: "onSubmit",
//   });

//   const { handleSubmit, setValue, formState } = methods;
//   const { data: defaultWallet } = useWalletServiceWalletDefaultQuery(undefined, {
//     select(data) {
//       if (data?.data?.address) {
//         setValue("wallet", data?.data?.address as string);
//       }
//       return data;
//     },
//   });

//   const onSubmit = handleSubmit(async (data) => {
//     try {
//       await createWallet(
//         { requestBody: { address: data.wallet as string, name: "main" } },
//         {
//           onSuccess() {
//             createPartner(
//               {
//                 requestBody: {
//                   building_number: data.building,
//                   city: data.city,
//                   country: data.country,
//                   full_name: data.fullname,
//                   street: data.street,
//                   zip_code: data.zipcode,
//                 },
//               },
//               {
//                 onSuccess() {
//                   queryClient.invalidateQueries({ queryKey: [useAuthServiceMeQueryKey] });
//                   push("/profile/become-partner/kyc-info");
//                 },
//               }
//             );
//           },
//         }
//       );
//     } catch (_error) {
//       enqueueSnackbar(t("personalInfoDialog.updateFailed"), { variant: "error" });
//     }
//   });

//   return (
//     <CustomDialog fullWidth maxWidth="sm" aria-labelledby="personal-info" open={open} onClose={back}>
//       <DialogTitle sx={{ m: 0, p: 2 }} id="change-password-dialog">
//         <Stack direction="row" alignItems="center" justifyContent="space-between">
//           <Stack direction={"row"} alignItems="center" spacing={1}>
//             <Typography variant="h4-semi-bold" color={"common.white"}>
//               {t("personalInfoDialog.title")}
//             </Typography>
//           </Stack>

//           <IconButton onClick={back}>
//             <Icon name="Close" />
//           </IconButton>
//         </Stack>
//       </DialogTitle>
//       <Divider />

//       <DialogContent dividers sx={{ p: 3 }}>
//         <Stack gap={3}>
//           <CustomizedSteppers activeStep={0} />

//           <Divider flexItem />

//           <FormProvider methods={methods} onSubmit={onSubmit} sx={{ gap: 3 }}>
//             <Stack direction={direction} spacing={3}>
//               <RHFTextField
//                 name="fullname"
//                 label={t("personalInfoDialog.fullnameLabel")}
//                 placeholder={t("personalInfoDialog.fullnamePlaceholder")}
//               />
//               <RHFTextField
//                 name="email"
//                 label={t("personalInfoDialog.emailLabel")}
//                 placeholder={t("personalInfoDialog.emailPlaceholder")}
//                 InputProps={{
//                   readOnly: true,
//                 }}
//               />
//             </Stack>
//             <Stack direction={direction} spacing={3}>
//               <RHFTextField
//                 name="country"
//                 label={t("personalInfoDialog.countryLabel")}
//                 placeholder={t("personalInfoDialog.countryPlaceholder")}
//               />
//               <RHFTextField
//                 name="city"
//                 label={t("personalInfoDialog.cityLabel")}
//                 placeholder={t("personalInfoDialog.cityPlaceholder")}
//               />
//             </Stack>
//             <Stack direction={direction} spacing={3}>
//               <RHFTextField
//                 name="street"
//                 label={t("personalInfoDialog.streetLabel")}
//                 placeholder={t("personalInfoDialog.streetPlaceholder")}
//               />
//               <RHFTextField
//                 name="building"
//                 label={t("personalInfoDialog.buildingLabel")}
//                 placeholder={t("personalInfoDialog.buildingPlaceholder")}
//               />
//             </Stack>
//             <Stack direction={direction} spacing={3}>
//               <RHFTextField
//                 name="zipcode"
//                 label={t("personalInfoDialog.zipcodeLabel")}
//                 placeholder={t("personalInfoDialog.zipcodePlaceholder")}
//               />
//               <RHFTextField
//                 name="wallet"
//                 label={t("personalInfoDialog.walletLabel")}
//                 placeholder={t("personalInfoDialog.walletPlaceholder")}
//                 InputProps={{
//                   readOnly: !!defaultWallet?.data?.address,
//                 }}
//               />
//             </Stack>
//           </FormProvider>
//         </Stack>
//       </DialogContent>
//       <DialogActions>
//         <Stack width={"100%"} direction={"row"} justifyContent={"space-between"}>
//           <Button color="info" onClick={nativeBack}>
//             {t("button.back")}
//           </Button>
//           <LoadingButton color="primary" onClick={onSubmit} loading={isPending} disabled={!formState.isValid}>
//             {t("button.nextStep")}
//           </LoadingButton>
//         </Stack>
//       </DialogActions>
//     </CustomDialog>
//   );
// };

// export default PersonalInfoDialog;
