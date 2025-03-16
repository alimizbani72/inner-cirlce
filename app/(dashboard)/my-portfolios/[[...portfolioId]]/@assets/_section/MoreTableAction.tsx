'use client';
import { MenuItem } from '@mui/material';
import { IconButton, Stack } from '@mui/material';
import ActionItem from './ActionItem';
import { useTranslate } from '@/locales';
import { useParams } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { getActivePortfolioId } from '../../_section/utils';
import { invalidatePortfolioQueries } from '../../_section/InvaidatePorfolioQueries';
import Icon from '@/components/icon';
import CustomMenu from '@/components/CustomMenu';
import { toast } from 'sonner';
import { useDeletePortfoliosIdAssetsSlug } from '@/services/minecraft/portfolio/portfolio';
import usePopover from '@/components/custom-popover/use-popover';
type MoreTableProps = {
  slug: string;
};
const MoreTableAction = ({ slug }: MoreTableProps) => {
  const { portfolioId } = useParams();
  const queryClient = useQueryClient();
  const { t } = useTranslate();
  const { onClose, onOpen, open } = usePopover();
  const activePortfolioId = getActivePortfolioId(portfolioId);
  const { mutateAsync } = useDeletePortfoliosIdAssetsSlug();
  const handleDelete = async () => {
    await mutateAsync(
      { id: activePortfolioId, slug },

      {
        onSuccess: () => {
          invalidatePortfolioQueries(queryClient, {
            portfolioId: activePortfolioId,
            invalidatePortfolioId: true,
            invalidateHistory: true,
            invalidatePortfolio: true,
          });

          toast.success(`${slug} ${t('assetsTable.assetDeletesuccessMessage')}`);
          onClose();
        },
        onError: () => {
          toast.error(`${t('assetsTable.assetDeleteerrorMessage')} ${slug}`);
        },
      }
    );
  };

  return (
    <>
      <IconButton
        onClick={(event) => {
          event.stopPropagation();
          onOpen(event);
        }}
      >
        <Icon name="MoreIcon" />
      </IconButton>

      <CustomMenu anchorEl={open} open={!!open} onClose={onClose}>
        <MenuItem>
          <Stack spacing={2}>
            {/* <ActionItem iconName="Pen" label={t("assetsTable.edit")} />
            <Divider /> */}
            <ActionItem
              iconName="TrashIcon"
              label={t('assetsTable.delete')}
              onClick={handleDelete}
            />
          </Stack>
        </MenuItem>
      </CustomMenu>
    </>
  );
};

export default MoreTableAction;
