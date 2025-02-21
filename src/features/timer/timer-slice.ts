import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TimeState {
  startTime: number;
  endTime: number;
}

const initialState: TimeState = {
  startTime: 0,
  endTime: 0,
};

export const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: (create) => ({
    setStart: create.reducer((state, action: PayloadAction<number>) => {
      state.startTime = action.payload;
    }),
    setEnd: create.reducer((state, action: PayloadAction<number>) => {
      state.endTime = action.payload;
    }),
  }),
  selectors: {
    selectStartTime: (data) => data.startTime,
    selectEndTime: (data) => data.endTime,
  },
});

export const { setEnd, setStart } = timerSlice.actions;
export const { selectEndTime, selectStartTime } = timerSlice.selectors;
