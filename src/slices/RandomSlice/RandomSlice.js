import { createSlice } from "@reduxjs/toolkit";
import { FetchRandomThunk } from "./randomThunk";

const RandomSlice = createSlice({
  name: 'random',
  initialState: {
    status: "idle",
    data: [],
    error: null,
    total:240,
    total_pages:8,
    count:30,
    page: 0,
  },
  reducers: {
    resetRandomStateData(state) {
      state.data = [];
      state.page = 1;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(FetchRandomThunk.pending, (state) => {
        state.status = 'pending'
    })
    .addCase(FetchRandomThunk.fulfilled, (state, action) => {
      state.status = "fulfilled";
      const { page, data: results } = action.payload;
    
      const pageExist = state.data.some(item => item.page === page);
      if (pageExist) return;
    
      const filtered_results = results.map(result => ({
        page,
        id: result.id,
        urls: result.urls,
        links: result.links,
        description: result.description,
        description_url: result.description_url,
        width: result.width,
        height: result.height,
        likes: result.likes,
        views: result.views,
        downloads: result.downloads,
      }));
    
      const existingIds = state.data.map(item => item.id);
      const newUniqueResults = filtered_results.filter(result => !existingIds.includes(result.id));
    
      state.data = [...state.data, ...newUniqueResults];
      state.page = page;
    })    
    .addCase(FetchRandomThunk.rejected, (state, action) => {
      state.status = 'rejected'
      state.error = action.error
    })
}
})

export const { resetRandomStateData,addOneToRandomStatePage } = RandomSlice.actions;
export const RandomSliceReducer = RandomSlice.reducer;

