import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const api_url = process.env.REACT_APP_API_URL;
const initialState = {
  loading: false,
  isLoggedIn: false,
  error: '',
};

console.log(api_url)

export const userLogin = createAsyncThunk('auth/userLogin', async (userCredentials) => {
  return axios.post(api_url + '/auth/login', userCredentials).then(res=>res.data);
});

export const userSignup = createAsyncThunk('auth/userSignup', async (userCredentials) => {
  return axios.post(api_url + '/auth/signup', userCredentials).then((res)=>res.data);
});

export const userLogout = createAsyncThunk('auth/logout', async (userCredentials) => {
  return axios.get(api_url + '/auth/logout', userCredentials).then((res)=>res.data);
});

const userAuthenticationSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(userLogin.fulfilled, (state) => {
      state.loading = false;
      state.isLoggedIn = true;
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
      state.loading = false;
      state.isLoggedIn = false;
      state.error = '';
    });
    builder.addCase(userLogout.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export default userAuthenticationSlice.reducer;
