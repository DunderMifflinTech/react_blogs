import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const api_url = process.env.REACT_APP_API_URL;
const initialState = {
  isLoggedIn: false,
  _id:'',
  name: '',
  email:'',
  profilePictureURL:'',
  loading: false,
  error: '',
};

export const userLogin = createAsyncThunk('auth/userLogin', async (userCredentials) => {
  return axios.post(api_url + '/auth/login', userCredentials).then(res=>res.data);
});

export const userSignup = createAsyncThunk('auth/userSignup', async (userCredentials) => {
  return axios.post(api_url + '/auth/signup', userCredentials).then((res)=>res.data);
});

export const userLogout = createAsyncThunk('auth/logout', async () => {
  return axios.get(api_url + '/auth/logout').then((res)=>res.data);
});

const userAuthenticationSlice = createSlice({
  name: 'auth',
  initialState,
  reducers:{
    reset: ()=> initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state._id= action.payload.data._id;
      state.name = action.payload.data.name;
      state.email = action.payload.data.email;
      state.profilePictureURL = action.payload.data.profilePictureURL;
      state.loading = false;
      state.error = '';
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      state.loading = false;
      state.isLoggedIn = false;
      state.error = action.payload;
    });
    builder.addCase(userSignup.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(userSignup.fulfilled, (state) => {
      state.loading = false;
      state.isLoggedIn = true;
      state.error = '';
    });
    builder.addCase(userSignup.rejected, (state, action) => {
      state.loading = false;
      state.isLoggedIn = false;
      state.error = action.payload;
    });
    builder.addCase(userLogout.fulfilled, (state) => {
      state = initialState
    });
    builder.addCase(userLogout.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});
console.log(userAuthenticationSlice)

export default userAuthenticationSlice.reducer;
export const {reset} = userAuthenticationSlice.actions;
