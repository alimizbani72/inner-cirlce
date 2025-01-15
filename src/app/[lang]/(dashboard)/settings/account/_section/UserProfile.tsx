import { Stack, Typography } from "@mui/material";
import { Icon } from "@/components/icons";
import { useIsMobile } from "@/hooks/use-responsive";
import { useAuthServiceMe } from "@minecraft/queries";
import { useCallback, useState } from "react";
import { UploadAvatar } from "@/components/upload";
import { useDefaultServicePostApiV1FilesUpload } from "@/manualServices/hooks";
import { downloadURL } from "@/consts";
import { enqueueSnackbar } from "notistack";
import { LoadingButton } from "@mui/lab";
import { useTranslate } from "@/locales";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { modifyUser, selectUser } from "@/lib/features/user/userSlice";
import { useSession } from "next-auth/react";

const UserProfile = () => {
  const isMobile = useIsMobile();
  const userInfo = useAppSelector(selectUser);
  const { update } = useSession();
  const dispatch = useAppDispatch();
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
            { requestBody: { avatar_url: downloadURL(res?.data) } },
            {
              onSuccess: () => {
                enqueueSnackbar(t("userProfile.avatarUpdatedSuccess"));
                setAvatar({ ...avatar, link: downloadURL(res.data) });
                dispatch(modifyUser({ avatar_url: downloadURL(res?.data) }));
                update({ user: { avatar_url: downloadURL(res?.data) } });
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
          dispatch(modifyUser({ avatar_url: "" }));
          update({ user: { avatar_url: "" } });
        },
        onError: () => {
          enqueueSnackbar(t("userProfile.avatarRemoveFailed"), { variant: "error" });
        },
      }
    );
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
                sx={{ whiteSpace: "pre", px: { xs: 1, sm: 3 } }}
                onClick={onUpload}
              >
                {t("userProfile.uploadPicture")}
              </LoadingButton>
              <LoadingButton
                loading={isUploadAvatarPending || isUploadPending}
                color="info"
                startIcon={<Icon name="Close" />}
                fullWidth
                sx={{ px: { xs: 1, sm: 3 } }}
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
