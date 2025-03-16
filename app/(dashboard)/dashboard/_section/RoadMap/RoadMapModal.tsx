import CustomDialog from '@/components/CustomDialog';
import { fDate, formatStr } from '@/utils/format-time';
import {
  Box,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import Status from './Status';
import Icon from '@/components/icon';
import ContentParser from '@app-components/ContentParser';
import { Scrollbar } from '@/components/scrollbar';
import { Image } from '@/components/image';

type RoadMapModalProps = {
  open: boolean;
  close: VoidFunction;
  title: string;
  date: string;
  status: string;
  image: string;
  descriptionText: string;
};

export default function RoadMapModal({
  open,
  close,
  image,
  descriptionText,
  title,
  status,
  date,
}: RoadMapModalProps) {
  return (
    <CustomDialog
      fullWidth
      maxWidth="md"
      onClose={close}
      aria-labelledby="RoadMapModal-dialog"
      open={open}
    >
      <DialogTitle id="RoadMapModal-dialog">
        <Stack direction="row" justifyContent="space-between">
          <Stack gap={1} mr={{ md: undefined, xs: 4 }}>
            <Typography variant="h4-semi-bold">{title}</Typography>
            <Stack direction={'row'} spacing={2} alignItems={'center'}>
              <Typography variant="caption-regular" color={'grey.light'}>
                {fDate(date, formatStr.date)}
              </Typography>
              <Box
                sx={{
                  width: '4px',
                  height: '4px',
                  borderRadius: '50%',
                  bgcolor: 'grey.dark',
                }}
              />
              <Status status={status}>{status}</Status>
            </Stack>
          </Stack>
          <IconButton onClick={close} sx={{ mt: { xs: 0.5, md: 1 } }}>
            <Icon name="CloseIcon" />
          </IconButton>
        </Stack>
      </DialogTitle>
      <Divider />
      <Scrollbar>
        <DialogContent dividers>
          <Stack spacing={3} pt={3}>
            <Image src={image} />
            <ContentParser content={descriptionText} />
          </Stack>
        </DialogContent>
      </Scrollbar>
    </CustomDialog>
  );
}
