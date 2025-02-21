import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { imageSlice } from "../../features/image/image-slice";
import { managerSlice } from "../../features/manager/manager-slice";
import { timerSlice } from "../../features/timer/timer-slice";

// Create the root reducer separately so we can extract the RootState type
const rootReducer = combineSlices(imageSlice, managerSlice, timerSlice);

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
