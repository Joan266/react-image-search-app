import { createSlice } from "@reduxjs/toolkit";
import { FetchRandomThunk } from "./randomThunk";

const RandomSlice = createSlice({
  name: 'random',
  initialState: {
    status: "idle",
    data: [],
    error: null,
    total:null,
    total_pages:null,
    count:32,
    page: 1,
  },
  reducers: {
    resetRandomStateData(state) {
      state.data = [];
      state.total = null;
      state.total_pages = null;
      state.page = 1;
    },
    addOneToRandomStatePage(state){
      state.page = state.page + 1;
    }

  },
  extraReducers: (builder) => {
    builder.addCase(FetchRandomThunk.pending, (state, action) => {
        state.status = 'pending'
    })
    .addCase(FetchRandomThunk.fulfilled, (state, action) => {
      state.status = "fulfilled";
      const filtered_results = action.payload.map(result => ({
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
    .addCase(FetchRandomThunk.rejected, (state, action) => {
      state.status = 'rejected'
      state.error = action.error
    })
}
})

export const { resetRandomStateData,addOneToRandomStatePage } = RandomSlice.actions;
export const RandomSliceReducer = RandomSlice.reducer;

