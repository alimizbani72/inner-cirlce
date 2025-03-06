'use client';
import { IconButton } from '@mui/material';
import AddPortfolioModal from '../add/AddPortfolioModal';
import useToggleState from '@/hooks/use-toggle-state';
import { useTranslate } from '@/locales';
import CustomTooltip from '@/components/CustomTooltip';
import Icon from '@/components/icon';

const PlusTab = () => {
  const [open, toggle] = useToggleState();
  const { t } = useTranslate();
  return (
    <>
      <CustomTooltip
        title={t('portfolioSummary.createPorfolio')}
        sx={{ mb: 1, bgcolor: 'dark.3', borderRadius: '50%' }}
      >
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            toggle();
          }}
          sx={{ minWidth: 64, minHeight: 64, bgcolor: 'dark.3' }}
        >
          <Icon name="PlusIcon" size={24} />
        </IconButton>
      </CustomTooltip>
      {open && <AddPortfolioModal open={open} close={toggle} isEditMode={false} />}
    </>
  );
};

export default PlusTab;
