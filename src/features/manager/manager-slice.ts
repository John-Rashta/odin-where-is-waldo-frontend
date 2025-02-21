import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface managerState {
  gameOver: boolean;
  openAddScore: boolean;
}

const initialState: managerState = {
  gameOver: true,
  openAddScore: false,
};

export const managerSlice = createSlice({
  name: "manager",
  initialState,
  reducers: (create) => ({
    setGameState: create.reducer((state, action: PayloadAction<boolean>) => {
      state.gameOver = action.payload;
    }),
    setAddScore: create.reducer((state, action: PayloadAction<boolean>) => {
      state.openAddScore = action.payload;
    }),
  }),
  selectors: {
    selectGameState: (data) => data.gameOver,
    selectOpenScoreState: (data) => data.openAddScore,
  },
});

export const { setGameState, setAddScore } = managerSlice.actions;
export const { selectGameState, selectOpenScoreState } = managerSlice.selectors;
