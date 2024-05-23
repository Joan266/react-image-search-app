import { createAppSlice } from "./createAppSlice"

const CLIENT_ID = "5aiFF-NISREFhkAi7lS1gdtnkzGkfg6IAxrpT8lBhFs";
const createUnsplashQuery = (query) => 
  `https://api.unsplash.com/search/photos?page=1&query="${query}"&client_id=${CLIENT_ID}`;

const searchSlice = createAppSlice({
  name: 'search',
  initialState: {
    status: "idle",
    data: [],
    error: null,
  },
  reducers: (create) => ({
    searchApiPhotosByQuery: create.asyncThunk(
      async (query, thunkApi) => {
        try {
          const request = await fetch(createUnsplashQuery(query));
          if (request.ok) {
            const data = await request.json();
            return data;
          }
          return null;
        } catch (Error) {
          return null;
        }
      },
      {
        pending: (state) => {
          state.status = "pending";
        },
        rejected: (state, action) => {
          state.status = "rejected";
          state.error = action.payload ?? action.error;
          alert(`Error API photos - ${action.payload ?? action.error}`);
        },
        fulfilled: (state, action) => {
          state.status = "fulfilled";
          state.data = action.payload.results;
        },
      }
    ),
  }),
})

export const { searchApiPhotosByQuery } = searchSlice.actions;
export const searchSliceReducer = searchSlice.reducer;