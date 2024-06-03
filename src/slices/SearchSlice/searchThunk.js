import { createAsyncThunk } from "@reduxjs/toolkit";

const CLIENT_ID = "5aiFF-NISREFhkAi7lS1gdtnkzGkfg6IAxrpT8lBhFs";
const createUnsURLSearchPhotosByQuery = (query) =>  `https://api.unsplash.com/search/photos?page=1?per_page=20&query=${query}&client_id=${CLIENT_ID}`
const unsURLRandomPhotos = `https://api.unsplash.com/photos/random?count=20&client_id=${CLIENT_ID}`

export const FetchSearchThunk = createAsyncThunk("search/fetchSearchThunk", async (query) => {
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
},)

export const FetchRandomThunk = createAsyncThunk("search/fetchRandomThunk",   async () => {
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
},)