'use client';
import CustomDialog from '@/components/CustomDialog';
import { Avatar, Button, DialogActions, DialogContent, Stack, Typography } from '@mui/material';
import FormProvider from '@/components/hook-form/form-provider';
import { RHFTextField } from '@/components/hook-form';
import { useForm } from 'react-hook-form';
import { useIsMobile } from '@/hooks/use-responsive';
import ChangeAvatarModal from './ChangeAvatarModal';
import useToggleState from '@/hooks/use-toggle-state';
import { useState } from 'react';
import { avatarBgColors, emojiList } from '@/utils/emojies';
import { useTranslate } from '@/locales';

import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import Icon from '@/components/icon';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  getGetPortfoliosQueryKey,
  usePostPortfolios,
  usePutPortfoliosId,
} from '@/services/minecraft/portfolio/portfolio';
import type { PortfolioHttpPortfolioResponse } from '@/services/minecraft/minecraftAPI.schemas';
import LoadingButton from '@/components/loading-button';

type AddPortfolioProps = {
  open: boolean;
  close: VoidFunction;
  isEditMode?: Boolean;
  portfolio?: PortfolioHttpPortfolioResponse;
};
const UpdateUserSchema = z.object({
  name: z.string().nonempty(),
});
const AddPortfolioModal = ({ open, close, portfolio, isEditMode }: AddPortfolioProps) => {
  const queryClient = useQueryClient();
  const { t } = useTranslate();
  const isMobile = useIsMobile();
  const [bgColor, setBgColor] = useState(portfolio?.background_color || avatarBgColors[0]);
  const [portfolioAvatar, setPortfolioAvatar] = useState(portfolio?.avatar || emojiList[0]);
  const [openChangeAvatarModal, toggleChangeAvatarModal] = useToggleState();
  const { mutateAsync: createPortfolio, isPending: createIsPending } = usePostPortfolios();
  const { mutateAsync: updatePortfolio, isPending: updateIsPending } = usePutPortfoliosId();
  const methods = useForm({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: {
      name: portfolio?.name || '',
    },
    mode: 'onSubmit',
  });
  const handleAvatarSave = (color: string, avatar: string) => {
    setBgColor(color);
    setPortfolioAvatar(avatar);
  };
  const { handleSubmit, formState } = methods;
  const isvalid = formState.isValid;
  const onSubmit = handleSubmit(async (data) => {
    const body = {
      name: data.name,
      avatar: portfolioAvatar,
      background_color: bgColor,
    };
    try {
      if (isEditMode && portfolio) {
        await updatePortfolio({
          data: body,
          id: portfolio.id as any,
        });
      } else {
        await createPortfolio({
          data: body,
        });
      }

      queryClient.invalidateQueries({
        queryKey: getGetPortfoliosQueryKey(),
      });

      close();
    } catch (_error) {
      const errorMessage = isEditMode
        ? t('myPortfolio.errorUpdateMessage')
        : t('myPortfolio.errorcreateMessage');
      toast.error(errorMessage);
    }
  });

  return (
    <CustomDialog
      fullWidth
      maxWidth="sm"
      onClose={close}
      aria-labelledby="AddPortfolio-dialog"
      open={open}
      title={isEditMode ? t('myPortfolio.updatePortfolio') : t('myPortfolio.addPortfolio')}
    >
      <DialogContent sx={{ p: 3 }}>
        <FormProvider methods={methods} sx={{ gap: 3 }}>
          <Typography variant="caption-semi-bold">{t('myPortfolio.avatar')}</Typography>
          <Stack direction={'row'} alignItems={'center'} spacing={2}>
            <Avatar sx={{ width: 88, height: 88, bgcolor: bgColor, fontSize: '32px' }}>
              {portfolioAvatar}
            </Avatar>
            <Button
              onClick={toggleChangeAvatarModal}
              startIcon={<Icon name="MoreRoundIcon" stroke="dark.1" />}
              color="secondary"
            >
              {isMobile ? t('myPortfolio.change') : t('myPortfolio.changeAvatar')}
            </Button>
          </Stack>
          <RHFTextField
            name="name"
            label={t('myPortfolio.portfolioname')}
            placeholder={t('myPortfolio.portfolionamePlaceholder')}
          />
        </FormProvider>
      </DialogContent>
      <DialogActions>
        <Stack width={'100%'} direction={'row'} justifyContent={'space-between'}>
          <Button color="tertiary" onClick={close}>
            {t('myPortfolio.cancel')}
          </Button>
          <LoadingButton
            onClick={onSubmit}
            type="submit"
            disabled={!isvalid}
            loading={createIsPending || updateIsPending}
          >
            {isMobile
              ? t(isEditMode ? 'myPortfolio.update' : 'myPortfolio.create')
              : t(isEditMode ? 'myPortfolio.updatePortfolio' : 'myPortfolio.createPortfolio')}
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
