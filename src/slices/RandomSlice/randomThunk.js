import { createAsyncThunk } from "@reduxjs/toolkit";
import { UNS_CLIENT_ID } from '../../config';

const createUnsRandomPhotosUrl = (page,count) =>  
  `https://api.unsplash.com/photos/random?page=${page}&count=${count}&client_id=5aiFF-NISREFhkAi7lS1gdtnkzGkfg6IAxrpT8lBhFs`

export const FetchRandomThunk = createAsyncThunk("random/fetchRandomThunk", async ({ page, count }) => {
  try {
    const request = await fetch(createUnsRandomPhotosUrl(page,count));
    if (request.ok) {
      const data = await request.json();
      return data;
    }
    return null;
  } catch (Error) {
    return null;
  }
},)
