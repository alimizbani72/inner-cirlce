import Icon from "@/components/icon";
import { customInstance } from "@/scripts/fetcher";
import { IconButton } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
export const useDeletePortfoliosId = () => {
  return useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      return await customInstance({
        url: `/portfolios/${id}`,
        method: "DELETE",
      });
    },
  });
};

const MorePortfolioAction = () => {
  //   try {
  //     await mutateAsync({ id: getportfolioId });
  //     toast.success(t("portfolioSummary.portfolioSuccessMessage"));
  //     invalidatePortfolioQueries(queryClient, {
  //       portfolioId: getportfolioId,
  //       invalidateHistory: true,
  //       invalidatePortfolio: true,
  //     });

  //     router.replace("/my-portfolios");
  //     onClose();
  //   } catch (_error) {
  //     toast.error(t("portfolioSummary.portfolioerrorMessage"));
  //   }
  // };
  // const onopenPortfolioModal = () => {
  //   toggleportfolio();
  //   onClose();
  // };
  return (
    <>
      <IconButton>
        <Icon name="MoreIcon" />
      </IconButton>
    </>
  );
};

export default MorePortfolioAction;
