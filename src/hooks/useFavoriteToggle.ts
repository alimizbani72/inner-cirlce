import { useTranslate } from "@/locales";
import {
  useCoinReportServiceCoinReportSlugFavoriteCreateMutation,
  useCoinReportServiceCoinReportSlugFavoriteDeleteMutation,
} from "@minecraft/queries";
import { useSnackbar } from "notistack";
import { useState } from "react";
export const useFavoriteToggle = (favStatus: boolean, slug: string) => {
  const { t } = useTranslate();
  const [isFavorite, setIsFavorite] = useState(favStatus);
  const { enqueueSnackbar } = useSnackbar();
  const { mutateAsync: mutateAddFavorite } = useCoinReportServiceCoinReportSlugFavoriteCreateMutation();
  const { mutateAsync: mutateRemoveFavorite } = useCoinReportServiceCoinReportSlugFavoriteDeleteMutation();

  const toggleFavorite = async () => {
    const successMessage = isFavorite
      ? t("coinreportsingleview.removedSuccess")
      : t("coinreportsingleview.addedSuccess");
    const errorMessage = isFavorite ? t("coinreportsingleview.removedError") : t("coinreportsingleview.addedError");

    try {
      if (isFavorite) {
        await mutateRemoveFavorite({ slug });
      } else {
        await mutateAddFavorite({ slug });
      }

      enqueueSnackbar(successMessage, {
        variant: "success",
      });
      setIsFavorite((prev) => !prev);
    } catch (_error) {
      enqueueSnackbar(errorMessage, {
        variant: "error",
      });
    }
  };

  return { isFavorite, toggleFavorite };
};
