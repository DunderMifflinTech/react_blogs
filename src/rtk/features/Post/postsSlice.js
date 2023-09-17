import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchRequiredUsers } from '../userCache/useCacheSlice';
import axios from 'axios';
const api_url = import.meta.env.VITE_API_URL;

const initialState = {
  posts: [],
  error: null,
  loading: false,
};

export const fetchUserFeed = createAsyncThunk(
  'feed/fetchUserFeed',
  async () => {
    return axios.get(api_url + '/post/get-all-posts').then((res) => {
        return res.data;
    });
  }
);

const postSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserFeed.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUserFeed.fulfilled, (state, action) => {
      state.loading = false;
      state.posts = action.payload.data;
      state.error = null;
    });
    builder.addCase(fetchUserFeed.rejected, (state, action) => {
      state.loading = false;
      state.posts = [];
      state.error = action.payload;
    });
  },
});

export default postSlice.reducer;
export const { reset } = postSlice.actions;
