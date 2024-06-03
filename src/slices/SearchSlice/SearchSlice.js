import { createSlice } from "@reduxjs/toolkit";
import { FetchRandomThunk, FetchSearchThunk } from "./searchThunk";



const SearchSlice = createSlice({
  name: 'search',
  initialState: {
    status: "idle",
    randomData: [],
    searchData:[],
    error: null,
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
      const { results } = action.payload;
      state.status = "fulfilled";
      state.searchData = results.map(result => ({
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
    })
    .addCase(FetchSearchThunk.rejected, (state, action) => {
      state.status = 'rejected'
      state.error = action.error
    })
    .addCase(FetchRandomThunk.pending, (state, action) => {
      state.status = 'pending'
    })
    .addCase(FetchRandomThunk.fulfilled, (state, action) => {
      state.status = 'fulfilled'
      state.randomData = action.payload.map(result => ({
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
    })
    .addCase(FetchRandomThunk.rejected, (state, action) => {
      state.status = 'rejected'
      state.error = action.error
    })
}
})

export const { resetSearchStateData } = SearchSlice.actions;
export const SearchSliceReducer = SearchSlice.reducer;

