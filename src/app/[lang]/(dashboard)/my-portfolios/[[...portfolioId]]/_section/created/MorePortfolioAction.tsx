import { Icon } from "@/components/icons";
import { Divider, MenuItem } from "@mui/material";
import { IconButton, Stack } from "@mui/material";
import CustomMenu from "@/components/CustomMenu";
import { useTranslate } from "@/locales";
import { usePopover } from "@/components/custom-popover";
import ActionItem from "../../@assets/_section/ActionItem";
import {
  usePortfolioServicePortfoliosIdDeleteMutation,
  UsePortfolioServicePortfoliosQueryKeyFn,
} from "@minecraft/queries";
import { useParams } from "next/navigation";
import { useSnackbar } from "notistack";
import { useAppRouter } from "@/routes/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { getActivePortfolioId } from "../utils";
import useToggleState from "@/hooks/use-toggle-state";
import AddPortfolioModal from "../add/AddPortfolioModal";
import type { Portfolio } from "../type";

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
  const handleDelete = async () => {
    await mutateAsync(
      { id: getActivePortfolioId(portfolioId) },
      {
        onSuccess: () => {
          enqueueSnackbar("Portfolio Deleted Successfully", {
            variant: "success",
          });
          queryClient.invalidateQueries({
            queryKey: UsePortfolioServicePortfoliosQueryKeyFn(),
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
        <MenuItem>
          <Stack spacing={2}>
            <ActionItem iconName="Pen" label={t("portfolioSummary.editPOrtfolio")} onClick={onopenPortfolioModal} />
            <Divider />
            <ActionItem iconName="Trash" label={t("portfolioSummary.deletePOrtfolio")} onClick={handleDelete} />
          </Stack>
        </MenuItem>
      </CustomMenu>
      {openPortfolioModal && (
        <AddPortfolioModal open={openPortfolioModal} close={toggleportfolio} portfolio={portfolio} isEditMode={true} />
      )}
    </>
  );
};

export default MorePortfolioAction;
