import { Divider, MenuItem, Stack } from '@mui/material';
import { IconButton } from '@mui/material';
import { useTranslate } from '@/locales';
import ActionItem from '../../@assets/_section/ActionItem';
import { useParams } from 'next/navigation';
import { useAppRouter } from '@/routes/hooks';
import { useQueryClient } from '@tanstack/react-query';
import { getActivePortfolioId } from '../utils';
import useToggleState from '@/hooks/use-toggle-state';
import AddPortfolioModal from '../add/AddPortfolioModal';
import { invalidatePortfolioQueries } from '../InvaidatePorfolioQueries';
import CustomMenu from '@/components/CustomMenu';
import { toast } from 'sonner';
import Icon from '@/components/icon';
import { useDeletePortfoliosId } from '@/services/minecraft/portfolio/portfolio';
import type { PortfolioHttpPortfolioResponse } from '@/services/minecraft/minecraftAPI.schemas';
import usePopover from '@/components/custom-popover/use-popover';
type Props = {
  portfolio: PortfolioHttpPortfolioResponse;
};
const MorePortfolioAction = ({ portfolio }: Props) => {
  const [openPortfolioModal, toggleportfolio] = useToggleState();
  const { portfolioId } = useParams();
  const { t } = useTranslate();
  const router = useAppRouter();
  const queryClient = useQueryClient();
  const { onClose, onOpen, open } = usePopover();
  const { mutateAsync } = useDeletePortfoliosId();
  const getportfolioId = getActivePortfolioId(portfolioId);

  const handleDelete = async () => {
    try {
      await mutateAsync({ id: getportfolioId });
      toast.success(t('portfolioSummary.portfolioSuccessMessage'));
      invalidatePortfolioQueries(queryClient, {
        portfolioId: getportfolioId,
        invalidateHistory: true,
        invalidatePortfolio: true,
      });

      router.replace('/my-portfolios');
      onClose();
    } catch (_error) {
      toast.error(t('portfolioSummary.portfolioerrorMessage'));
    }
  };
  const onopenPortfolioModal = () => {
    toggleportfolio();
    onClose();
  };
  return (
    <>
      <IconButton onClick={onOpen}>
        <Icon name="MoreIcon" />
      </IconButton>

      <CustomMenu anchorEl={open} open={!!open} onClose={onClose}>
        <Stack spacing={1}>
          <Stack>
            <MenuItem onClick={onopenPortfolioModal}>
              <ActionItem iconName="PenIcon" label={t('portfolioSummary.editPOrtfolio')} />
            </MenuItem>
          </Stack>
          <Divider />
          <Stack>
            <MenuItem onClick={handleDelete}>
              <ActionItem iconName="TrashIcon" label={t('portfolioSummary.deletePOrtfolio')} />
            </MenuItem>
          </Stack>
        </Stack>
      </CustomMenu>
      {openPortfolioModal && (
        <AddPortfolioModal
          open={openPortfolioModal}
          close={toggleportfolio}
          portfolio={portfolio}
          isEditMode={true}
        />
      )}
    </>
  );
};

export default MorePortfolioAction;
