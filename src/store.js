import { configureStore } from '@reduxjs/toolkit'
import { searchSliceReducer } from './slices/searchSlice'
import { favSliceReducer } from './slices/favSlice'
export const store = configureStore({
  reducer: {
    search: searchSliceReducer,
    fav: favSliceReducer,
  },
})