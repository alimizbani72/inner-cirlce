"use client";
import CustomDialog from "@/components/CustomDialog";
import {
  Avatar,
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { IconButton } from "@mui/material";
import { Icon } from "@/components/icons";
import FormProvider from "@/components/hook-form/form-provider";
import { RHFTextField } from "@/components/hook-form";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useIsMobile } from "@/hooks/use-responsive";
import ChangeAvatarModal from "./ChangeAvatarModal";
import useToggleState from "@/hooks/use-toggle-state";
import { useState } from "react";
import { avatarBgColors, emojiList } from "@/utils/emojies";
import { useTranslate } from "@/locales";
import {
  usePortfolioServicePortfoliosCreateMutation,
  usePortfolioServicePortfoliosIdUpdateMutation,
  UsePortfolioServicePortfoliosQueryKeyFn,
} from "@minecraft/queries";
import { useSnackbar } from "notistack";
import { useQueryClient } from "@tanstack/react-query";
import { LoadingButton } from "@mui/lab";

type Portfolio = {
  avatar: string;
  id?: string;
  background_color: string;
  name: string;
};
type AddPortfolioProps = {
  open: boolean;
  close: VoidFunction;
  isEditMode?: Boolean;
  portfolio?: Portfolio;
};
const UpdateUserSchema = Yup.object().shape({
  name: Yup.string().required(),
});

const AddPortfolioModal = ({ open, close, portfolio, isEditMode }: AddPortfolioProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const { t } = useTranslate();
  const isMobile = useIsMobile();
  const [bgColor, setBgColor] = useState(portfolio?.background_color || avatarBgColors[0]);
  const [portfolioAvatar, setPortfolioAvatar] = useState(portfolio?.avatar || emojiList[0]);
  const [openChangeAvatarModal, toggleChangeAvatarModal] = useToggleState();
  const { mutateAsync: createPortfolio, isPending: createIsPending } = usePortfolioServicePortfoliosCreateMutation();
  const { mutateAsync: updatePortfolio, isPending: updateIsPending } = usePortfolioServicePortfoliosIdUpdateMutation();
  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues: {
      name: portfolio?.name || "",
    },
    mode: "onSubmit",
  });
  const handleAvatarSave = (color: string, avatar: string) => {
    setBgColor(color);
    setPortfolioAvatar(avatar);
  };
  const { handleSubmit, formState } = methods;
  const { isValid } = formState;
  const onSubmit = handleSubmit(async (data) => {
    const requestBody = {
      name: data.name,
      avatar: portfolioAvatar,
      background_color: bgColor,
    };
    const mutationFn =
      isEditMode && portfolio
        ? updatePortfolio({ requestBody, id: portfolio.id as any })
        : createPortfolio({ requestBody });

    const successMessage = isEditMode ? t("myPortfolio.errorUpdateMessage") : t("myPortfolio.errorcreateMessage");

    try {
      await mutationFn;
      queryClient.invalidateQueries({
        queryKey: UsePortfolioServicePortfoliosQueryKeyFn(),
      });
      close();
    } catch (_error) {
      enqueueSnackbar(successMessage, {
        variant: "error",
      });
    }
  });
  return (
    <CustomDialog fullWidth maxWidth="sm" onClose={close} aria-labelledby="AddPortfolio-dialog" open={open}>
      <DialogTitle sx={{ m: 0, p: 2 }} id="AddPortfolio-dialog">
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h4-semi-bold">
            {isEditMode ? t("myPortfolio.updatePortfolio") : t("myPortfolio.addPortfolio")}
          </Typography>
          <IconButton onClick={close}>
            <Icon name="Close" />
          </IconButton>
        </Stack>
      </DialogTitle>
      <Divider />

      <DialogContent dividers sx={{ p: 3 }}>
        <FormProvider methods={methods} sx={{ gap: 3 }}>
          <Typography variant="caption-semi-bold">{t("myPortfolio.avatar")}</Typography>
          <Stack direction={"row"} alignItems={"center"} spacing={2}>
            <Avatar sx={{ width: 88, height: 88, bgcolor: bgColor, fontSize: "32px" }}>{portfolioAvatar}</Avatar>
            <Button
              onClick={toggleChangeAvatarModal}
              color="info"
              sx={{
                background: "radial-gradient(50% 50% at 50% 50%, #FFF 0%, #CDDFF2 100%)",
                boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.24), 0px 0px 0px 2px rgba(255, 255, 255, 0.40) inset",
                color: "dark.1",
              }}
            >
              <Box pr={1} sx={{ stroke: (theme) => theme.palette.dark[1] }}>
                <Icon name="Arrow-Round" />
              </Box>
              {isMobile ? t("myPortfolio.change") : t("myPortfolio.changeAvatar")}
            </Button>
          </Stack>
          <RHFTextField
            name="name"
            label={t("myPortfolio.portfolioname")}
            placeholder={t("myPortfolio.portfolionamePlaceholder")}
          />
        </FormProvider>
      </DialogContent>
      <DialogActions>
        <Stack width={"100%"} direction={"row"} justifyContent={"space-between"}>
          <Button color="info" onClick={close}>
            {t("myPortfolio.cancel")}
          </Button>
          <LoadingButton
            onClick={onSubmit}
            type="submit"
            disabled={!isValid}
            loading={createIsPending || updateIsPending}
          >
            {isMobile
              ? isEditMode
                ? t("myPortfolio.update")
                : t("myPortfolio.create")
              : t(isEditMode ? "myPortfolio.updatePortfolio" : "myPortfolio.createPortfolio")}
          </LoadingButton>
        </Stack>
      </DialogActions>
      {openChangeAvatarModal && (
        <ChangeAvatarModal
          onSave={handleAvatarSave}
          bgColor={bgColor}
          portfolioAvatar={portfolioAvatar}
          open={openChangeAvatarModal}
          close={toggleChangeAvatarModal}
        />
      )}
    </CustomDialog>
  );
};

export default AddPortfolioModal;
