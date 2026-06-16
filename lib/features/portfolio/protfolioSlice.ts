import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
const saveToLocalStorage = (state: PortfolioState) => {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(
    "portfolio_state",
    JSON.stringify({
      portfolios: state.portfolios,
      activePortfolioId: state.activePortfolioId,
    }),
  );
};
const getInitialState = (): PortfolioState => {
  if (typeof window === "undefined") {
    return {
      portfolios: [],
      portfolioToEdit: null,
      editMode: false,
      isModalOpen: false,
      activePortfolioId: "",
    };
  }

  const stored = localStorage.getItem("portfolio_state");

  if (stored) {
    const parsed = JSON.parse(stored);

    return {
      portfolios: parsed.portfolios || [],
      portfolioToEdit: null,
      editMode: false,
      isModalOpen: false,
      activePortfolioId: parsed.activePortfolioId || "",
    };
  }

  return {
    portfolios: [],
    portfolioToEdit: null,
    editMode: false,
    isModalOpen: false,
    activePortfolioId: "",
  };
};
interface Portfolio {
  id: string;
  name: string;
  avatar: string;
  background_color: string;
  actual_value?: number;
}

interface PortfolioState {
  portfolios: Portfolio[];
  portfolioToEdit: Portfolio | null;
  editMode: boolean;
  isModalOpen: boolean;
  activePortfolioId: string;
}
const initialState = getInitialState();
export const portfolioSlice = createSlice({
  name: "portfolios",
  initialState,
  reducers: {
    // UI control
    openEditMode: (state, action: PayloadAction<Portfolio>) => {
      state.portfolioToEdit = action.payload;
      state.editMode = true;
      state.isModalOpen = true;
    },

    openAddMode: (state) => {
      state.portfolioToEdit = null;
      state.editMode = false;
      state.isModalOpen = true;
    },

    closePortfolioModal: (state) => {
      state.portfolioToEdit = null;
      state.editMode = false;
      state.isModalOpen = false;
    },

    setActivePortfolioId: (state, action: PayloadAction<string>) => {
      state.activePortfolioId = action.payload;
    },

    // DATA actions
    addPortfolio: (state, action: PayloadAction<Portfolio>) => {
      state.portfolios.push(action.payload);
      saveToLocalStorage(state);
    },

    updatePortfolio: (state, action: PayloadAction<Portfolio>) => {
      const index = state.portfolios.findIndex(
        (p) => p.id === action.payload.id,
      );

      if (index !== -1) {
        state.portfolios[index] = action.payload;
        saveToLocalStorage(state);
      }
    },

    deletePortfolio: (state, action: PayloadAction<string>) => {
      state.portfolios = state.portfolios.filter(
        (p) => p.id !== action.payload,
      );
      saveToLocalStorage(state);
    },
  },

  selectors: {
    selectPortfolios: (state) => state.portfolios,
    selectPortfolioToEdit: (state) => state.portfolioToEdit,
    selectIsEditMode: (state) => state.editMode,
    selectIsModalOpen: (state) => state.isModalOpen,
    selectActivePortfolioId: (state) => state.activePortfolioId,
  },
});

export const {
  openEditMode,
  openAddMode,
  closePortfolioModal,
  setActivePortfolioId,
  addPortfolio,
  updatePortfolio,
  deletePortfolio,
} = portfolioSlice.actions;

export const {
  selectPortfolios,
  selectPortfolioToEdit,
  selectIsEditMode,
  selectIsModalOpen,
  selectActivePortfolioId,
} = portfolioSlice.selectors;
