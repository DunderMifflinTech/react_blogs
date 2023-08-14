import {
  createAsyncThunk,
  createSlice,
  createListenerMiddleware,
} from '@reduxjs/toolkit';
import axios from 'axios';
const api_url = import.meta.env.VITE_API_URL;
const initialState = {
  users: [],
  loading: false,
  error: null,
};

export const listenerMiddleware = createListenerMiddleware();

// the actualRequiredUsers variable contains the useers that are actually not present in the userCache and are to be requestd for
//the .some returns true and [stops] if the CB fucntion returns true once else it returns false if the CB function returns false for all the values

export const fetchRequiredUsers = createAsyncThunk(
  'userCache/fetchRequiredUsers',
  async (data, listenerAPI) => {
    let required_users;
    if (data) required_users = data;
    else
      required_users = listenerAPI
        .getState()
        .feed.posts.map((ele) => ele.ownerId);

    const existing_users = listenerAPI
      .getState()
      .userCache.users.map((ele) => ele._id);
    const actually_required_users = required_users.filter((req_usr_id) => {
      return !existing_users.some((exist_usr_id) => {
        return exist_usr_id === req_usr_id;
      });
    });
    // console.log('existing_users : ', existing_users, '\nrequired_users : ', required_users, '\nactually_required_user : ', actually_required_users);
    return axios
      .post(api_url + '/users/selected-users', actually_required_users)
      .then((res) => res.data);
  }
);

listenerMiddleware.startListening({
  type: 'feed/fetchUserFeed/fulfilled',
  effect: async (action, listenerAPI) => {
    listenerAPI.dispatch(fetchRequiredUsers());
  },
});

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
