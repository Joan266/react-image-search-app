import { configureStore } from '@reduxjs/toolkit'
import { SearchSliceReducer } from './slices/SearchSlice/SearchSlice.js'
import { RandomSliceReducer } from './slices/RandomSlice/RandomSlice.js'
import { FavSliceReducer } from './slices/FavSlice.js'
export const store = configureStore({
  reducer: {
    search: SearchSliceReducer,
    random:RandomSliceReducer,
    fav: FavSliceReducer,
  },
})