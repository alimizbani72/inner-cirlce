import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface TransactionState {
  transactionToEdit: Transaction | null;
  editMode: boolean;
  isModalOpen: boolean;
  activeSymbol: string | null;
}

interface Transaction {
  id: string;
  symbol: string;
  quantity: string;
  price: string;
  fee: string;
  note?: string;
  date: string;
  type: "buy" | "sell";
}

const initialState: TransactionState = {
  transactionToEdit: null,
  editMode: false,
  isModalOpen: false,
  activeSymbol: null,
};

export const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    openEditMode: (state, action: PayloadAction<Transaction>) => {
      state.transactionToEdit = action.payload;
      state.editMode = true;
      state.isModalOpen = true;
    },
    openAddMode: (state) => {
      state.transactionToEdit = null;
      state.editMode = false;
      state.isModalOpen = true;
    },
    closeTransactionModal: (state) => {
      state.transactionToEdit = null;
      state.editMode = false;
      state.isModalOpen = false;
    },
    setActiveSlug: (state, action: PayloadAction<string | null>) => {
      state.activeSymbol = action.payload;
    },
  },
  selectors: {
    selectIsModalOpen: (state) => state.isModalOpen,
    selectIsEditMode: (state) => state.editMode,
    selectTransactionToEdit: (state) => state.transactionToEdit,
    selectActiveSymbol: (state) => state.activeSymbol,
  },
});

export const { openEditMode, openAddMode, closeTransactionModal, setActiveSlug } = transactionSlice.actions;
export const { selectIsModalOpen, selectIsEditMode, selectTransactionToEdit, selectActiveSymbol } =
  transactionSlice.selectors;
