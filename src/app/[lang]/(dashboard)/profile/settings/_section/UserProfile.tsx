import { Stack, Typography } from "@mui/material";
import { Icon } from "@/components/icons";
import { useIsMobile } from "@/hooks/use-responsive";
import { useAuthServiceMe, useAuthServiceMeQueryKey } from "@minecraft/queries";
import { useCallback, useState } from "react";
import { UploadAvatar } from "@/components/upload";
import { useDefaultServicePostApiV1FilesUpload } from "@/manualServices/hooks";
import { downloadURL } from "@/consts";
import { enqueueSnackbar } from "notistack";
import { getQueryClient } from "@app/_providers/customQueryClient";
import { LoadingButton } from "@mui/lab";
import { useTranslate } from "@/locales";
import { useAppSelector } from "@/lib/hooks";
import { selectUser } from "@/lib/features/user/userSlice";

const UserProfile = () => {
  const isMobile = useIsMobile();
  const queryClient = getQueryClient();
  const userInfo = useAppSelector(selectUser);
  const { mutate: uploadFile, isPending: isUploadPending } = useDefaultServicePostApiV1FilesUpload();
  const { mutate: uploadAvatar, isPending: isUploadAvatarPending } = useAuthServiceMe();
  const [avatar, setAvatar] = useState<any>(
    userInfo?.avatar_url ? { preview: userInfo?.avatar_url, link: userInfo?.avatar_url } : null
  );

  const { t } = useTranslate();

  const handleDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];

    const newFile = Object.assign(file, { preview: URL.createObjectURL(file) });

    if (file) {
      setAvatar(newFile);
    }
  }, []);

  const onUpload = () => {
    if (!avatar) {
      return enqueueSnackbar(t("userProfile.choosePicError"), { variant: "error" });
    }

    uploadFile(
      { formData: { file: avatar } },
      {
        onSuccess: (res: any) => {
          uploadAvatar(
            { requestBody: { avatar_url: downloadURL(res?.data?.[0]) } },
            {
              onSuccess: () => {
                enqueueSnackbar(t("userProfile.avatarUpdatedSuccess"));
                setAvatar({ ...avatar, link: downloadURL(res.data?.[0]) });
                queryClient.invalidateQueries({ queryKey: [useAuthServiceMeQueryKey] });
              },
              onError: () => {
                enqueueSnackbar(t("userProfile.avatarUpdateFailed"), { variant: "error" });
              },
            }
          );
        },
        onError: () => {
          setAvatar(null);
        },
      }
    );
  };

  const onRemoveAvatar = () => {
    uploadAvatar(
      { requestBody: { avatar_url: "" } },
      {
        onSuccess: () => {
          enqueueSnackbar(t("userProfile.avatarRemovedSuccess"));
          setAvatar(null);
          queryClient.invalidateQueries({ queryKey: [useAuthServiceMeQueryKey] });
        },
        onError: () => {
          enqueueSnackbar(t("userProfile.avatarRemoveFailed"), { variant: "error" });
        },
      }
    );
  };

  return (
    <Stack sx={{ borderRadius: "12px", width: "100%", mb: 2 }}>
      <Stack direction={isMobile ? "column" : "row"} justifyContent={"space-between"} alignItems={"center"} gap={2}>
        <Stack direction={"row"} spacing={2} alignItems={"center"} sx={{ width: "100%" }}>
          <UploadAvatar sx={{ width: 96, height: 96 }} file={avatar} maxSize={3145728} onDrop={handleDrop} />
          <Stack flex={1} sx={{ width: "100%" }} gap={2}>
            <Typography variant="p2-semi-bold" color="common.white">
              {t("userProfile.title")}
            </Typography>
            <Stack direction={isMobile ? "column" : "row"} gap={2} sx={{ width: "100%" }}>
              <LoadingButton
                loading={isUploadAvatarPending || isUploadPending}
                startIcon={<Icon name="Plus" />}
                fullWidth
                sx={{ whiteSpace: "pre" }}
                onClick={onUpload}
              >
                {t("userProfile.uploadPicture")}
              </LoadingButton>
              <LoadingButton
                loading={isUploadAvatarPending || isUploadPending}
                color="info"
                startIcon={<Icon name="Close" />}
                fullWidth
                onClick={onRemoveAvatar}
              >
                {t("userProfile.remove")}
              </LoadingButton>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
export default UserProfile;
