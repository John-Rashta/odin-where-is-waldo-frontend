import { configureStore, combineSlices } from "@reduxjs/toolkit";
import { apiSlice } from "../components/game-api-slice";
import { imageSlice } from "../components/image-slice";
import { managerSlice } from "../components/manager-slice";
import { timerSlice } from "../components/timer-slice";
import { setupListeners } from "@reduxjs/toolkit/query";

const rootReducer = combineSlices(imageSlice, apiSlice, managerSlice, timerSlice);

export const makeStore = (preloadedState?: Partial<RootState>) => {
    const store = configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => {
            return getDefaultMiddleware().concat(apiSlice.middleware);
        },
        preloadedState,
    });
    setupListeners(store.dispatch)
    return store;
};

export const store = makeStore();

export type AppStore = typeof store;
export type AppDispatch = AppStore["dispatch"];
export type RootState = ReturnType<typeof rootReducer>;