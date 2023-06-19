import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
} from './authTypes';
import axios from 'axios';

export const sendLoginRequest = () => {
  return {
    type: USER_LOGIN_REQUEST,
  };
};

export const loginSucccess = () => {
  return {
    type: USER_LOGIN_SUCCESS,
  };
};

export const loginFailure = (error) => {
  return {
    type: USER_LOGIN_FAILURE,
    payload: error,
  };
};

export const userLogin = (userCredentials) => async (dispatch) => {
  try {
    dispatch(sendLoginRequest());
    const request = await axios.post(
      'http://localhost:3001/auth/login',
      userCredentials
    );
    // console.log(request.status);
    dispatch(loginSucccess());
    return true;
  } catch (err) {
    dispatch(loginFailure(err.message));
    return false;
  }
};

export const userSignUp = (userCredentials)=> async (dispatch)=>{
  try{
    dispatch(sendLoginRequest());
    const request = await axios.post('http://localhost:3001/auth/signup', userCredentials);
    dispatch(loginSucccess());
    return true;
  }catch(err){
    console.log(err)
    dispatch(loginFailure(err.message));
    return false;
  }
}
