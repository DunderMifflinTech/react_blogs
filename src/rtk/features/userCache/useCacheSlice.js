import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { ObjectId } from 'mongodb';
const api_url = process.env.REACT_APP_API_URL;

const initialState = {
  users: [],
  loading: false,
  error: null,
};

const parseObjectId = (id) => JSON.stringify(ObjectId(id));

export const fetchRequiredUsers = createAsyncThunk(
  'userCache/fetchRequiredUsers',
  async (users, { getState }) => {
    // the actualRequiredUsers variable contains the useers that are actually not present in the userCache and are to be requestd for
    const state = getState();

    let actualRequiredUsers = users.filter((id, idx) => {
      return !state.some((state_id) => {
        //the .some returns true and [stops] if the CB fucntion returns true once else it returns false if the CB function returns false for all the values
        return parseObjectId(state_id) === parseObjectId(id);
      });
    });
    // console.log(actualRequiredUsers);
    if (actualRequiredUsers.length <= 0) return new Promise.resolve();

    return axios
      .get(api_url + '/users/selected-users', actualRequiredUsers)
      .then((res) => res.data);
  }
);

const userCacheSlice = createSlice({
  name: 'userCache',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRequiredUsers.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(fetchRequiredUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.users.push(...action.payload);
    });

    builder.addCase(fetchRequiredUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default userCacheSlice.reducer;
export const { reset } = userCacheSlice.actions;
