import { configureStore } from '@reduxjs/toolkit'
import { SearchSliceReducer } from './slices/SearchSlice/SearchSlice.js'
import { FavSliceReducer } from './slices/FavSlice.js'
export const store = configureStore({
  reducer: {
    search: SearchSliceReducer,
    fav: FavSliceReducer,
  },
})