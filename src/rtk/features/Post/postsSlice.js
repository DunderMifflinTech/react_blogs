import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { fetchRequiredUsers } from '../userCache/useCacheSlice';
const api_url = process.env.REACT_APP_API_URL;

const initialState = {
  posts: [],
  error: null,
  loading: false,
};

export const fetchUserFeed = createAsyncThunk(
  'feed/fetchUserFeed',
  async (_, {dispatch}) => {
    return axios.get(api_url + '/post/get-all-posts').then((res) => {
        let users = res.data.data.map((obj)=>obj._id);
        return dispatch(fetchRequiredUsers(users));
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
