import { configureStore, combineSlices } from "@reduxjs/toolkit";
import { apiSlice } from "../components/game-api-slice";
import { imageSlice } from "../components/image-slice";
import { managerSlice } from "../components/manager-slice";

const rootReducer = combineSlices(imageSlice, apiSlice, managerSlice);

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(apiSlice.middleware);
    },
});

export type AppStore = typeof store;
export type AppDispatch = AppStore["dispatch"];
export type RootState = ReturnType<typeof rootReducer>;