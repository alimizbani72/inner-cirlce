import { Stack, Typography } from "@mui/material";
import { Icon } from "@/components/icons";
import { useIsMobile } from "@/hooks/use-responsive";
import {
  useAccountServiceAuthUserinfoQuery,
  useAccountServiceAuthUserinfoQueryKey,
  useUserServiceAccountsAvatarUpdate,
} from "@/services/queries";
import { useCallback, useState } from "react";
import { UploadAvatar } from "@/components/upload";
import { useDefaultServicePostApiV1FilesUpload } from "@/manualServices/hooks";
import { downloadURL } from "@/consts";
import { enqueueSnackbar } from "notistack";
import { getQueryClient } from "@app/_providers/customQueryClient";
import { LoadingButton } from "@mui/lab";

const UserProfile = () => {
  const isMobile = useIsMobile();
  const queryClient = getQueryClient();
  const { data: userInfo } = useAccountServiceAuthUserinfoQuery();
  const { mutate: uploadFile, isPending: isUploadPending } = useDefaultServicePostApiV1FilesUpload();
  const { mutate: uploadAvatar, isPending: isUploadAvatarPending } = useUserServiceAccountsAvatarUpdate();
  const [avatar, setAvatar] = useState<any>(
    (userInfo as any)?.data?.avatar_url
      ? { preview: (userInfo as any)?.data?.avatar_url, link: (userInfo as any)?.data?.avatar_url }
      : null
  );

  const handleDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];

    const newFile = Object.assign(file, { preview: URL.createObjectURL(file) });

    if (file) {
      setAvatar(newFile);
    }
  }, []);

  const onUpload = () => {
    if (!avatar) {
      return enqueueSnackbar("Choose your pic!", { variant: "error" });
    }

    uploadFile(
      { formData: { files: avatar } },
      {
        onSuccess: (res: any) => {
          uploadAvatar(
            { requestBody: { avatar_url: downloadURL(res?.data?.[0]) } },
            {
              onSuccess: () => {
                enqueueSnackbar("Avatar updated successfully!");
                setAvatar({ ...avatar, link: downloadURL(res.data?.[0]) });
                queryClient.invalidateQueries({ queryKey: [useAccountServiceAuthUserinfoQueryKey] });
              },
              onError: () => {
                enqueueSnackbar("Failed to update avatar!", { variant: "error" });
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
          enqueueSnackbar("Avatar removed successfully!");
          setAvatar(null);
          queryClient.invalidateQueries({ queryKey: [useAccountServiceAuthUserinfoQueryKey] });
        },
        onError: () => {
          enqueueSnackbar("Failed to remove avatar!", { variant: "error" });
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
              User Profile
            </Typography>
            <Stack direction={isMobile ? "column" : "row"} gap={2} sx={{ width: "100%" }}>
              <LoadingButton
                loading={isUploadAvatarPending || isUploadPending}
                startIcon={<Icon name="Plus" />}
                fullWidth
                sx={{ whiteSpace: "pre" }}
                onClick={onUpload}
              >
                Upload Picture
              </LoadingButton>
              <LoadingButton
                loading={isUploadAvatarPending || isUploadPending}
                color="info"
                startIcon={<Icon name="Close" />}
                fullWidth
                onClick={onRemoveAvatar}
              >
                Remove
              </LoadingButton>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
export default UserProfile;
