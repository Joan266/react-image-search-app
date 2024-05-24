import { createAppSlice } from "./createAppSlice"

const CLIENT_ID = "5aiFF-NISREFhkAi7lS1gdtnkzGkfg6IAxrpT8lBhFs";
const createUnsURLSearchPhotosByQuery = (query) =>  `https://api.unsplash.com/search/photos?page=1?per_page=20&query=${query}&client_id=${CLIENT_ID}`
const unsURLRandomPhotos = `https://api.unsplash.com/photos/random?count=20&client_id=${CLIENT_ID}`
  

const searchSlice = createAppSlice({
  name: 'search',
  initialState: {
    status: "idle",
    data: [],
    error: null,
  },
  reducers: (create) => ({
    searchUnsPhotosByQuery: create.asyncThunk(
      async (query) => {
        try {
          const request = await fetch(createUnsURLSearchPhotosByQuery(query));
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
    getRandomUnsPhotos: create.asyncThunk(
      async () => {
        try {
          const request = await fetch(unsURLRandomPhotos);
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
          state.data = action.payload;
        },
      }
    ),
    resetSearchStateData(state) {
      state.data = [];
    },
  }),
})

export const { searchUnsPhotosByQuery, getRandomUnsPhotos, resetSearchStateData } = searchSlice.actions;
export const searchSliceReducer = searchSlice.reducer;