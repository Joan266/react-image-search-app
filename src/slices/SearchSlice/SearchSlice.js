import { createSlice } from "@reduxjs/toolkit";
import { FetchSearchThunk } from "./searchThunk";

const SearchSlice = createSlice({
  name: 'search',
  initialState: {
    status: "idle",
    data: [],
    error: null,
    total:null,
    total_pages:null,
    count:30,
  },
  reducers: {
    resetSearchStateData(state) {
      state.data = [];
    }
  },
  extraReducers: (builder) => {
    builder.addCase(FetchSearchThunk.pending, (state, action) => {
        state.status = 'pending'
    })
    .addCase(FetchSearchThunk.fulfilled, (state, action) => {
      const { results, total, total_pages } = action.payload;
      state.status = "fulfilled";
      state.total = total;
      state.total_pages = total_pages;
      const filtered_results = results.map(result => ({
        id: result.id,
        urls: result.urls,
        links: result.links,
        description: result.description,
        description_url: result.description_url,
        width: result.width,
        height: result.height,
        likes: result.likes,
        views: result.views,
        downloads: result.downloads
      }));
      state.data = [...state.data, ...filtered_results] 
  
    })
    .addCase(FetchSearchThunk.rejected, (state, action) => {
      state.status = 'rejected'
      state.error = action.error
    })
}
})

export const { resetSearchStateData } = SearchSlice.actions;
export const SearchSliceReducer = SearchSlice.reducer;

