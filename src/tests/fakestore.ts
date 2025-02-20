import { combineSlices, configureStore } from '@reduxjs/toolkit'
import { imageSlice } from '../components/image-slice'
import { managerSlice } from '../components/manager-slice'



// Create the root reducer separately so we can extract the RootState type
const rootReducer = combineSlices(imageSlice, managerSlice);

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']