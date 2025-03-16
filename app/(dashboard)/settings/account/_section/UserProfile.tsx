import { getQueryClient } from '@/app/_providers/customQueryClient';
import Icon from '@/components/icon';
import LoadingButton from '@/components/loading-button';
import { UploadAvatar } from '@/components/upload';
// import { useDefaultServicePostApiV1FilesUpload } from '@/manualServices/hooks';
import { downloadURL } from '@/consts';
import { useIsMobile } from '@/hooks/use-responsive';
import { useTranslate } from '@/locales';
import { useDefaultServicePostApiV1FilesUpload } from '@/manualServices/hooks';
import { getGetMeQueryKey, useGetMe, usePatchMe } from '@/services/minecraft/auth/auth';
import { Stack, Typography } from '@mui/material';
import { useCallback, useState } from 'react';
import { toast } from 'sonner';

const UserProfile = () => {
  const isMobile = useIsMobile();
  const { data } = useGetMe();
  const avatarUrl = data?.data?.avatar_url;
  const { mutate: uploadFile, isPending: isUploadPending } =
    useDefaultServicePostApiV1FilesUpload();
  const queryClient = getQueryClient();

  const { mutateAsync: uploadAvatar, isPending: isUploadAvatarPending } = usePatchMe();
  const [avatar, setAvatar] = useState<any>(null);

  const { t } = useTranslate();

  const handleDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const convertSize = (file.size / 1048576).toFixed(2);
    if (+convertSize > 2) {
      toast.error(t('userProfile.errorSizePicture'));
      return;
    }
    const newFile = Object.assign(file, { preview: URL.createObjectURL(file) });

    if (file) {
      setAvatar(newFile);
    }
  }, []);

  const onUpload = () => {
    if (!avatar) {
      return toast.error(t('userProfile.choosePicError'));
    }

    uploadFile(
      { formData: { file: avatar } },
      {
        onSuccess: (res: any) => {
          uploadAvatar(
            { data: { avatar_url: downloadURL(res?.data) } },
            {
              onSuccess: () => {
                toast.success(t('userProfile.avatarUpdatedSuccess'));
                setAvatar({ ...avatar, link: downloadURL(res.data) });
                queryClient.invalidateQueries({ queryKey: getGetMeQueryKey() });
              },
              onError: () => {
                toast.error(t('userProfile.avatarUpdateFailed'));
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
      { data: { avatar_url: '' } },
      {
        onSuccess: () => {
          toast.success(t('userProfile.avatarRemovedSuccess'));
          setAvatar(null);
          queryClient.invalidateQueries({ queryKey: getGetMeQueryKey() });
        },
        onError: () => {
          toast.error(t('userProfile.avatarRemoveFailed'));
        },
      }
    );
  };

  return (
    <Stack
      sx={{
        borderRadius: '12px',
        width: '100%',
        mb: 2,
        p: 2,
        border: '1.5px solid',
        borderColor: 'dark.3',
        bgcolor: 'dark.2',
      }}
    >
      <Stack
        direction={isMobile ? 'column' : 'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        gap={2}
      >
        <Stack direction={'row'} spacing={2} alignItems={'center'} sx={{ width: '100%' }}>
          <UploadAvatar
            sx={{ width: 96, height: 96 }}
            value={avatar || avatarUrl}
            maxSize={3145728}
            onDrop={handleDrop}
          />
          <Stack flex={1} sx={{ width: '100%' }} gap={2}>
            <Typography variant="p2-semi-bold" color="common.white">
              {t('userProfile.title')}
            </Typography>
            <Stack direction={isMobile ? 'column' : 'row'} gap={2} sx={{ width: '100%' }}>
              <LoadingButton
                loading={isUploadAvatarPending || isUploadPending}
                startIcon={<Icon name="PlusIcon" />}
                fullWidth
                sx={{ whiteSpace: 'pre', px: { xs: 1, sm: 3 } }}
                onClick={onUpload}
              >
                {t('userProfile.uploadPicture')}
              </LoadingButton>
              {avatarUrl && (
                <LoadingButton
                  loading={isUploadAvatarPending || isUploadPending}
                  color="tertiary"
                  startIcon={<Icon name="CloseIcon" />}
                  fullWidth
                  sx={{ px: { xs: 1, sm: 3 } }}
                  onClick={onRemoveAvatar}
                >
                  {t('userProfile.remove')}
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
