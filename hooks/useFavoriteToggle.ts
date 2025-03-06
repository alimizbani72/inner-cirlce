import { useTranslate } from '@/locales';
import {
  useDeleteCoinReportSlugFavorite,
  usePostCoinReportSlugFavorite,
} from '@/services/minecraft/coin-report/coin-report';
import { useState } from 'react';
import { toast } from 'sonner';
export const useFavoriteToggle = (favStatus: boolean, slug: string) => {
  const { t } = useTranslate();
  const [isFavorite, setIsFavorite] = useState(favStatus);
  const { mutateAsync: mutateAddFavorite } = usePostCoinReportSlugFavorite();
  const { mutateAsync: mutateRemoveFavorite } = useDeleteCoinReportSlugFavorite();

  const toggleFavorite = async () => {
    const successMessage = isFavorite
      ? t('coinReportSingleView.removedSuccess')
      : t('coinReportSingleView.addedSuccess');
    const errorMessage = isFavorite
      ? t('coinReportSingleView.removedError')
      : t('coinReportSingleView.addedError');

    try {
      if (isFavorite) {
        await mutateRemoveFavorite({ slug });
      } else {
        await mutateAddFavorite({ slug });
      }

      toast.success(successMessage);
      setIsFavorite((prev) => !prev);
    } catch (_error) {
      toast.error(errorMessage);
    }
  };

  return { isFavorite, toggleFavorite };
};
