import { createAsyncThunk } from "@reduxjs/toolkit";
import { UNS_CLIENT_ID } from '../../config';

const createUnsSearchPhotosUrl = (query, page, count) =>  
  `https://api.unsplash.com/search/photos?page=${page}&per_page=${count}&query=${query}&client_id=${UNS_CLIENT_ID}`;

export const FetchSearchThunk = createAsyncThunk("search/fetchSearchThunk", async ({query,page,count}) => {
  try {
    const request = await fetch(createUnsSearchPhotosUrl(query,page,count));
    if (request.ok) {
      const data = await request.json();
      return data;
    }
    return null;
  } catch (Error) {
    return null;
  }
},)