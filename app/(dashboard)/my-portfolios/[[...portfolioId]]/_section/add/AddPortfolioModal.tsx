"use client";

import CustomDialog from "@/components/CustomDialog";
import { RHFTextField } from "@/components/hook-form";
import FormProvider from "@/components/hook-form/form-provider";
import { useIsMobile } from "@/hooks/use-responsive";
import useToggleState from "@/hooks/use-toggle-state";
import { useTranslate } from "@/locales";
import { avatarBgColors, emojiList } from "@/utils/emojies";
import {
  Avatar,
  Button,
  DialogActions,
  DialogContent,
  Stack,
  Typography,
} from "@mui/material";

import { useState } from "react";
import { useForm } from "react-hook-form";

import Icon from "@/components/icon";
import LoadingButton from "@/components/loading-button";
import ChangeAvatarModal from "./ChangeAvatarModal";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  addPortfolio,
  closePortfolioModal,
  selectPortfolioToEdit,
  updatePortfolio,
} from "@/lib/features/portfolio/protfolioSlice";
import { selectIsEditMode } from "@/lib/features/portfolio/transactionSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

const UpdateUserSchema = z.object({
  name: z.string().nonempty(),
});

const AddPortfolioModal = () => {
  const dispatch = useAppDispatch();

  const isEditMode = useAppSelector(selectIsEditMode);
  const portfolioToEdit = useAppSelector(selectPortfolioToEdit);

  const { t } = useTranslate();
  const isMobile = useIsMobile();

  const [bgColor, setBgColor] = useState(
    portfolioToEdit?.background_color || avatarBgColors[0],
  );

  const [portfolioAvatar, setPortfolioAvatar] = useState(
    portfolioToEdit?.avatar || emojiList[0],
  );

  const [openChangeAvatarModal, toggleChangeAvatarModal] = useToggleState();

  const methods = useForm({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: {
      name: portfolioToEdit?.name || "",
    },
    mode: "onSubmit",
  });

  const { handleSubmit, formState } = methods;
  const isValid = formState.isValid;

  const handleAvatarSave = (color: string, avatar: string) => {
    setBgColor(color);
    setPortfolioAvatar(avatar);
  };

  const onSubmit = handleSubmit(async (data) => {
    const payload = {
      id: portfolioToEdit?.id || crypto.randomUUID(),
      name: data.name,
      avatar: portfolioAvatar,
      background_color: bgColor,
      actual_value: portfolioToEdit?.actual_value || 0,
    };

    if (isEditMode && portfolioToEdit) {
      dispatch(updatePortfolio(payload));
    } else {
      dispatch(addPortfolio(payload));
    }

    dispatch(closePortfolioModal());
  });

  return (
    <CustomDialog
      fullWidth
      maxWidth="sm"
      onClose={() => dispatch(closePortfolioModal())}
      open={true}
      title={
        isEditMode
          ? t("myPortfolio.updatePortfolio")
          : t("myPortfolio.addPortfolio")
      }
    >
      <DialogContent sx={{ p: 3 }}>
        <FormProvider methods={methods} sx={{ gap: 3 }}>
          <Typography variant="caption-semi-bold">
            {t("myPortfolio.avatar")}
          </Typography>

          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar
              sx={{
                width: 88,
                height: 88,
                bgcolor: bgColor,
                fontSize: "32px",
              }}
            >
              {portfolioAvatar}
            </Avatar>

            <Button
              onClick={toggleChangeAvatarModal}
              startIcon={<Icon name="MoreRoundIcon" stroke="dark.1" />}
              color="secondary"
            >
              {isMobile
                ? t("myPortfolio.change")
                : t("myPortfolio.changeAvatar")}
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
        <Stack width="100%" direction="row" justifyContent="space-between">
          <Button
            color="tertiary"
            onClick={() => dispatch(closePortfolioModal())}
          >
            {t("myPortfolio.cancel")}
          </Button>

          <LoadingButton onClick={onSubmit} type="submit" disabled={!isValid}>
            {isMobile
              ? t(isEditMode ? "myPortfolio.update" : "myPortfolio.create")
              : t(
                  isEditMode
                    ? "myPortfolio.updatePortfolio"
                    : "myPortfolio.createPortfolio",
                )}
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
