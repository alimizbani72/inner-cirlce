"use client";

import Icon from "@/components/icon";
import LoadingButton from "@/components/loading-button";
import { UploadAvatar } from "@/components/upload";
import { useIsMobile } from "@/hooks/use-responsive";
import { useTranslate } from "@/locales";
import { useGetMe } from "@/services/minecraft/default/default";
import { Stack, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { toast } from "sonner";

const UserProfile = () => {
  const isMobile = useIsMobile();
  const { data } = useGetMe();
  const avatarUrl = data?.data?.avatar_url;

  const { t } = useTranslate();
  const [avatar, setAvatar] = useState<any>(null);

  // 🔹 fake upload state (no hooks)
  const isLoading = false;

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      const convertSize = (file.size / 1048576).toFixed(2);
      if (+convertSize > 2) {
        toast.error(t("userProfile.errorSizePicture"));
        return;
      }

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      setAvatar(newFile);
    },
    [t],
  );

  // 🔹 fake upload (no API)
  const onUpload = () => {
    if (!avatar) {
      return toast.error(t("userProfile.choosePicError"));
    }

    toast.success(t("userProfile.avatarUpdatedSuccess"));
    setAvatar(null);
  };

  // 🔹 fake remove
  const onRemoveAvatar = () => {
    toast.success(t("userProfile.avatarRemovedSuccess"));
    setAvatar(null);
  };

  return (
    <Stack
      sx={{
        borderRadius: "12px",
        width: "100%",
        mb: 2,
        p: 2,
        border: "1.5px solid",
        borderColor: "dark.3",
        bgcolor: "dark.2",
      }}
    >
      <Stack
        direction={isMobile ? "column" : "row"}
        justifyContent="space-between"
        alignItems="center"
        gap={2}
      >
        <Stack direction="row" spacing={2} alignItems="center" width="100%">
          <UploadAvatar
            sx={{ width: 96, height: 96 }}
            value={avatar || avatarUrl}
            maxSize={3145728}
            onDrop={handleDrop}
          />

          <Stack flex={1} width="100%" gap={2}>
            <Typography variant="p2-semi-bold" color="common.white">
              {t("userProfile.title")}
            </Typography>

            <Stack direction={isMobile ? "column" : "row"} gap={2} width="100%">
              <LoadingButton
                loading={isLoading}
                startIcon={<Icon name="PlusIcon" />}
                fullWidth
                onClick={onUpload}
              >
                upload
              </LoadingButton>

              {avatarUrl && (
                <LoadingButton
                  loading={isLoading}
                  color="tertiary"
                  startIcon={<Icon name="CloseIcon" />}
                  fullWidth
                  onClick={onRemoveAvatar}
                >
                  {t("userProfile.remove")}
                </LoadingButton>
              )}
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default UserProfile;
