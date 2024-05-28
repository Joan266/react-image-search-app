import { createSlice } from "@reduxjs/toolkit";

const favSlice = createSlice({
  name: 'fav',
  initialState: {
    status: "idle",
    data: [],
    error: null,
  },
  reducers: () => ({
    setFavs(state, action) {
      state.data = action.payload;
    },
    addFav(state, action) {
      const { id, description, alt_description } = action.payload;
      const exists = state.data.some(fav => fav.id === id);
      
      if (!exists) {
        const importDate = Date.now();
        const descriptionToUse = description || alt_description;
        const newFav = { ...action.payload, importDate, description: descriptionToUse };
        state.data.push(newFav);
      }
    },
    deleteFav(state, action) {
      const index = state.data.findIndex(fav => fav.id === action.payload.id);
      if (index > -1) {
        state.data.splice(index, 1)
      }
    },
    updateFavDescription(state, action) {
      const index = state.data.findIndex(fav => fav.id === action.payload.id);
      if (index !== -1) {
        state.data[index].description = action.payload.description;
      } 
    }
  }),
})

export const { setFavs, addFav, updateFavDescription, deleteFav } = favSlice.actions;
export const favSliceReducer = favSlice.reducer;
