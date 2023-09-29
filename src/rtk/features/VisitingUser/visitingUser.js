import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const api_url = import.meta.env.VITE_API_URL;

const initialState = {
  user: {
    _id: null,
    name: null,
    email: null,
    profilePictureURL: null,
    dateCreated: null,
    details:{
      country:'',
      state:'',
      education:'',
      bio:'',
    },
    followers: [],
    following: [],
  },
  posts: [],
  loading: false,
  error: '',
};

export const fetchVisitingUser = createAsyncThunk(
  'visitingUser/fetchVisitingUser',
  async (data) => {
    return axios
      .post(api_url + '/users/selected-users', [data])
      .then((res) => {return res.data});
  }
);

export const visitingUserSlice = createSlice({
  name: 'visitingUser',
  initialState,
  reducers: {
    resetVisitingUserSlice: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchVisitingUser.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(fetchVisitingUser.fulfilled, (state, action) => {
      // console.log(action);
      state.loading = false;
      state.user._id = action.payload[0]._id;
      state.user.name = action.payload[0].name;
      state.user.email = action.payload.email;
      state.user.profilePictureURL = action.payload[0].profilePictureURL;
      state.user.backgroundPictureURL = action.payload[0].backgroundPictureURL;
      state.user.dateCreated = action.payload[0].dateCreated;
      state.user.details.country = action.payload[0]?.details?.country
      state.user.details.state = action.payload[0].details?.state
      state.user.details.bio = action.payload[0].details?.bio
      state.user.details.education = action.payload[0].details?.education
      state.user.followers = action.payload[0].followers;
      state.user.following = action.payload[0].following;
      state.posts = action.payload[0].posts;
      state.error = '';
    });
    builder.addCase(fetchVisitingUser.rejected, (state, action) => {
      console.log(action)
      state.loading = false;
      state.posts = [];
      state.error = action.error.message;
    });
  },
});

export default visitingUserSlice.reducer;
export const { resetVisitingUserSlice } = visitingUserSlice.actions;
