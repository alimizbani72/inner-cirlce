'use client';
import CustomDialog from '@/components/CustomDialog';
import {
  Avatar,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import { IconButton } from '@mui/material';
import { useIsMobile } from '@/hooks/use-responsive';
import { avatarBgColors, emojiList } from '@/utils/emojies';
import { Box } from '@mui/material';
import { useMemo, useState } from 'react';
import { useTranslate } from '@/locales';
import Icon from '@/components/icon';
type AddPortfolioProps = {
  open: boolean;
  close: VoidFunction;
  onSave: (color: string, emoji: string) => void;
  bgColor: string;
  portfolioAvatar: string;
};

const ChangeAvatarModal = ({
  open,
  close,
  onSave,
  bgColor,
  portfolioAvatar,
}: AddPortfolioProps) => {
  const isMobile = useIsMobile();
  const { t } = useTranslate();
  const [localBgColor, setLocalBgColor] = useState(bgColor);
  const [localPortfolioAvatar, setLocalPortfolioAvatar] = useState(portfolioAvatar);

  const displayedBgColors = useMemo(
    () => (isMobile ? avatarBgColors.slice(0, 6) : avatarBgColors),
    [isMobile]
  );

  const displayedemojiList = useMemo(
    () => (isMobile ? emojiList.slice(0, 12) : emojiList),
    [isMobile]
  );
  const handleSaveChanges = () => {
    onSave(localBgColor, localPortfolioAvatar);
    close();
  };
  return (
    <CustomDialog
      fullWidth
      maxWidth="sm"
      onClose={close}
      aria-labelledby="ChangeAvatar-dialog"
      open={open}
    >
      <DialogTitle id="ChangeAvatar-dialog">
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack direction={'row'} spacing={1} alignItems={'center'}>
            <IconButton onClick={close}>
              <Icon name="ArrowLeftIcon" />
            </IconButton>
            <Typography variant="h4-semi-bold">{t('myPortfolio.changeAvatar')}</Typography>
          </Stack>
          <IconButton onClick={close}>
            <Icon name="CloseIcon" />
          </IconButton>
        </Stack>
      </DialogTitle>
      <Divider />
      <DialogContent dividers sx={{ p: 3 }}>
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', md: 'row' }} justifyContent={'space-between'}>
            <Avatar sx={{ width: 88, height: 88, bgcolor: localBgColor, fontSize: '32px' }}>
              {localPortfolioAvatar}
            </Avatar>

            <Stack
              direction={'row'}
              spacing={1}
              alignItems={'center'}
              sx={{
                alignItems: 'center',
                pl: { xs: 1.5, md: undefined },
                pt: { xs: 3, md: undefined },
              }}
            >
              {displayedBgColors.map((color, index) => (
                <Box
                  key={index}
                  onClick={() => setLocalBgColor(color)}
                  sx={{
                    border: '2px solid',
                    borderColor: localBgColor === color ? 'pink.dark' : 'transparent',
                    p: 0.5,
                    borderRadius: '50%',
                  }}
                >
                  <Box
                    sx={{
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      bgcolor: color,
                      cursor: 'pointer',
                    }}
                  />
                </Box>
              ))}
            </Stack>
          </Stack>
          <Divider />
          <Typography variant="p2-medium" color={'grey.light'}>
            {t('myPortfolio.feelingAboutPortfolioText')}
          </Typography>
          <Stack
            direction={'row'}
            flexWrap={'wrap'}
            spacing={4}
            px={1.5}
            sx={{ cursor: 'pointer' }}
          >
            {displayedemojiList.map((emoji, index) => (
              <Box key={index} onClick={() => setLocalPortfolioAvatar(emoji)}>
                <Typography sx={{ fontSize: '27px' }}>{emoji}</Typography>
              </Box>
            ))}
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Stack width={'100%'} direction={'row'} justifyContent={'end'}>
          <Button sx={{ width: { xs: '100%', md: 'auto' } }} onClick={handleSaveChanges}>
            {t('myPortfolio.saveChanges')}
          </Button>
        </Stack>
      </DialogActions>
    </CustomDialog>
  );
};

export default ChangeAvatarModal;
