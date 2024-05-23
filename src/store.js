import { configureStore } from '@reduxjs/toolkit'
import { searchSliceReducer } from './slices/searchSlice'
export const store = configureStore({
  reducer: {
    search:searchSliceReducer
  },
})