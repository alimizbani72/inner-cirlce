import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface PortfolioSliceState {
  selectedPortfolioId: number
}


const initialState: PortfolioSliceState = {
  selectedPortfolioId: 1, 
};

export const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    
    setSelectedPortfolioId: (state, action: PayloadAction<number>) => {
      state.selectedPortfolioId = action.payload;
    },
  
  },
  selectors: {
    selectSelectedPortfolioId: (state: PortfolioSliceState) => state.selectedPortfolioId,
  },
});

export const { setSelectedPortfolioId } = portfolioSlice.actions;


export const { selectSelectedPortfolioId } = portfolioSlice.selectors;

