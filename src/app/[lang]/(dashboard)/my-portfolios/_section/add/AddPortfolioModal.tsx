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
type AddPortfolioProps = {
  open: boolean;
  close: VoidFunction;
};
const UpdateUserSchema = Yup.object().shape({
  portfolio_name: Yup.string().required(),
});

const AddPortfolioModal = ({ open, close }: AddPortfolioProps) => {
  const { t } = useTranslate();
  const isMobile = useIsMobile();
  const [bgColor, setBgColor] = useState(avatarBgColors[0]);
  const [portfolioAvatar, setPortfolioAvatar] = useState(emojiList[0]);
  const [openChangeAvatarModal, toggleChangeAvatarModal] = useToggleState();
  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues: {
      portfolio_name: "",
    },
    mode: "onSubmit",
  });
  const handleAvatarSave = (color: string, avatar: string) => {
    setBgColor(color);
    setPortfolioAvatar(avatar);
  };
  const { handleSubmit, formState } = methods;
  const { isValid } = formState;
  const onSubmit = handleSubmit((data) => {
    const payload = {
      ...data,
      portfolioAvatar,
      bgColor,
    };
    // biome-ignore lint/suspicious/noConsoleLog: <explanation>
    console.log(payload);
    close();
  });

  return (
    <CustomDialog fullWidth maxWidth="sm" onClose={close} aria-labelledby="AddPortfolio-dialog" open={open}>
      <DialogTitle sx={{ m: 0, p: 2 }} id="AddPortfolio-dialog">
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h4-semi-bold">{t("myPortfolio.addPortfolio")}</Typography>
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
            name="portfolio_name"
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
          <Button onClick={onSubmit} type="submit" disabled={!isValid}>
            {isMobile ? t("myPortfolio.create") : t("myPortfolio.createPortfolio")}
          </Button>
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
