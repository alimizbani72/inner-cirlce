'use client';

import CustomDialog from '@/components/CustomDialog';
import DialogContent from '@mui/material/DialogContent';
import {
  Checkbox,
  DialogActions,
  DialogTitle,
  Divider,
  FormControlLabel,
  Stack,
  Typography,
} from '@mui/material';
import { useState, type FC } from 'react';
import { selectLang } from '@/lib/features/dictionary/dicSlice';
import { useAppSelector } from '@/lib/hooks';
import dynamic from 'next/dynamic';
import LoadingButton from '@/components/loading-button';
import { toast } from 'sonner';
import { usePostAffiliateTos } from '@/services/minecraft/affiliate/affiliate';
import { useGetGlobalsAffilateTerms } from '@/services/cms/global-affilateterms/global-affilateterms';
import { useTranslate } from '@/locales';
import { Scrollbar } from '@/components/scrollbar';

const CMSContentParser = dynamic(() => import('@app-components/CMSContentParser'), { ssr: false });

type Props = {
  close: VoidFunction;
  open: boolean;
};

const TACDialog: FC<Props> = ({ close, open }) => {
  const lang = useAppSelector(selectLang);
  const { t } = useTranslate();
  const [value, setValue] = useState(false);
  const { data } = useGetGlobalsAffilateTerms({ locale: lang });

  const { mutateAsync, isPending } = usePostAffiliateTos();
  const handleSubmit = async () => {
    mutateAsync()
      .then(() => {
        close();
        toast.success(t('tacDialog.success'));
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <CustomDialog
      disableEscapeKeyDown
      onClose={(_event, reason) => {
        if (reason !== 'backdropClick') {
          close();
        }
      }}
      fullWidth
      maxWidth="md"
      open={open}
    >
      <DialogTitle>
        <Stack direction="row" justifyContent="space-between">
          <Stack gap={1} mr={{ md: undefined, xs: 4 }}>
            <Typography variant="h4-semi-bold">{t('tacDialog.title')}</Typography>
          </Stack>
          {/* <IconButton onClick={close} sx={{ mt: { xs: 0.5, md: 1 } }}>
            <Icon name="CloseIcon" />
          </IconButton> */}
        </Stack>
      </DialogTitle>
      <Divider />
      <Scrollbar>
        <DialogContent>
          <Stack gap={3}>
            <CMSContentParser layout={data?.data.layout} />
          </Stack>
        </DialogContent>
      </Scrollbar>
      <DialogActions sx={{ p: 3 }}>
        <Stack flex={1} direction={{ md: 'row' }} gap={2} justifyContent="space-between">
          <FormControlLabel
            value={value}
            onChange={(_event, checked) => setValue(checked)}
            control={<Checkbox />}
            label={t('tacDialog.description')}
          />
          <LoadingButton disabled={!value} onClick={handleSubmit} loading={isPending}>
            {t('tacDialog.btn')}
          </LoadingButton>
        </Stack>
      </DialogActions>
    </CustomDialog>
  );
};

export default TACDialog;
