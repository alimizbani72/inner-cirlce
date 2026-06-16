import Icon from "@/components/icon";
import {
  openAddMode,
  selectIsModalOpen,
} from "@/lib/features/portfolio/transactionSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Button } from "@mui/material";
import TransactionModal from "./transaction/TransactionModal";
type Props = {
  btnText: string;
};
const TransactionActionButton = ({ btnText }: Props) => {
  const isModalOpen = useAppSelector(selectIsModalOpen);
  const dispatch = useAppDispatch();
  const handleAddTransactionClick = () => {
    dispatch(openAddMode());
  };

  return (
    <>
      <Button
        onClick={handleAddTransactionClick}
        startIcon={<Icon name="PlusIcon" />}
        sx={{ whiteSpace: "pre" }}
      >
        {btnText}
      </Button>
      {isModalOpen && <TransactionModal />}
    </>
  );
};

export default TransactionActionButton;
