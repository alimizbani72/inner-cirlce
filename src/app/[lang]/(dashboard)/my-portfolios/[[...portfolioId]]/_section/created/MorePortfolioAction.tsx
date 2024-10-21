import { Icon } from "@/components/icons";
import { Divider, MenuItem, Stack } from "@mui/material";
import { IconButton } from "@mui/material";
import CustomMenu from "@/components/CustomMenu";
import { useTranslate } from "@/locales";
import { usePopover } from "@/components/custom-popover";
import ActionItem from "../../@assets/_section/ActionItem";
import { usePortfolioServicePortfoliosIdDeleteMutation } from "@minecraft/queries";
import { useParams } from "next/navigation";
import { useSnackbar } from "notistack";
import { useAppRouter } from "@/routes/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { getActivePortfolioId } from "../utils";
import useToggleState from "@/hooks/use-toggle-state";
import AddPortfolioModal from "../add/AddPortfolioModal";
import type { Portfolio } from "../type";
import { invalidatePortfolioQueries } from "../InvaidatePorfolioQueries";

type Props = {
  portfolio: Portfolio | undefined;
};
const MorePortfolioAction = ({ portfolio }: Props) => {
  const { enqueueSnackbar } = useSnackbar();
  const [openPortfolioModal, toggleportfolio] = useToggleState();
  const { portfolioId } = useParams();
  const { t } = useTranslate();
  const router = useAppRouter();
  const queryClient = useQueryClient();
  const { onClose, onOpen, open } = usePopover();
  const { mutateAsync } = usePortfolioServicePortfoliosIdDeleteMutation();
  const getportfolioId = getActivePortfolioId(portfolioId);
  const handleDelete = async () => {
    await mutateAsync(
      { id: getportfolioId },
      {
        onSuccess: () => {
          enqueueSnackbar("Portfolio Deleted Successfully", {
            variant: "success",
          });
          invalidatePortfolioQueries(queryClient, {
            portfolioId: getportfolioId,
            invalidateHistory: true,
            invalidatePortfolio: true,
            invalidatePortfolioId: true,
          });
          router.push("/my-portfolios");
          onClose();
        },
        onError: () => {
          enqueueSnackbar("Fialed to delete Portfolio", {
            variant: "error",
          });
        },
      }
    );
  };
  const onopenPortfolioModal = () => {
    toggleportfolio();
    onClose();
  };
  return (
    <>
      <IconButton onClick={onOpen}>
        <Icon name="More" />
      </IconButton>

      <CustomMenu anchorEl={open} open={!!open} onClose={onClose}>
        <Stack spacing={1}>
          <Stack>
            <MenuItem onClick={onopenPortfolioModal}>
              <ActionItem iconName="Pen" label={t("portfolioSummary.editPOrtfolio")} />
            </MenuItem>
          </Stack>
          <Divider />
          <Stack>
            <MenuItem onClick={handleDelete}>
              <ActionItem iconName="Trash" label={t("portfolioSummary.deletePOrtfolio")} />
            </MenuItem>
          </Stack>
        </Stack>
      </CustomMenu>
      {openPortfolioModal && (
        <AddPortfolioModal open={openPortfolioModal} close={toggleportfolio} portfolio={portfolio} isEditMode={true} />
      )}
    </>
  );
};

export default MorePortfolioAction;
