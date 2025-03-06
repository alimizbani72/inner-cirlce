'use client';

import { useState, type FC } from 'react';
import { Button, Typography } from '@mui/material';
import Icon from '@/components/icon';
import EnableModal from './EnableModal';
import DisableModal from './DisableModal';
import { useTranslate } from '@/locales';

type TwoFAProps = {
  isEnable: boolean;
};

const TwoFA: FC<TwoFAProps> = ({ isEnable }) => {
  const [openEnable, setOpenEnable] = useState(false);
  const [openDisable, setOpenDisable] = useState(false);
  const { t } = useTranslate();

  const closeEnableModal = () => {
    setOpenEnable(false);
  };
  const closeDisableModal = () => {
    setOpenDisable(false);
  };
  const handleClick = () => {
    if (isEnable) {
      setOpenDisable(true);
    } else {
      setOpenEnable(true);
    }
  };
  return (
    <>
      {openEnable && <EnableModal open={openEnable} close={closeEnableModal} />}
      {openDisable && <DisableModal open={openDisable} close={closeDisableModal} />}

      <Button
        onClick={handleClick}
        startIcon={<Icon name="PasswordIcon" stroke={isEnable ? 'danger.main' : 'success.main'} />}
        sx={{
          whiteSpace: 'pre',
        }}
        fullWidth
        size="large"
        color="tertiary"
      >
        <Typography variant="p2-medium">
          {isEnable ? 'Disable 2FA' : t('profileDialog.enable2FA')}
        </Typography>
      </Button>
    </>
  );
};

export default TwoFA;
