import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_FAILURE,
} from './authTypes';
import axios from 'axios';
import { SERVER_URL } from '../../Secrets';

export const sendLoginRequest = () => {
  return {
    type: USER_LOGIN_REQUEST,
  };
};

export const sendLogoutRequest = () => {
  return {
    type : USER_LOGOUT_REQUEST,
  }
}

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

export const logoutSucccess = () => {
  return {
    type: USER_LOGOUT_SUCCESS,
  };
};

export const logoutFailure = (error) => {
  return {
    type: USER_LOGOUT_FAILURE,
    payload: error,
  };
};


export const userLogin = (userCredentials) => async (dispatch) => {
  try {
    dispatch(sendLoginRequest());
    const request = await axios.post(
      SERVER_URL + '/auth/login',
      userCredentials
    );
    
    dispatch(loginSucccess());
    return true;
  } catch (err) {
    dispatch(loginFailure(err.message));
    return false;
  }
};

export const userSignUp = (userCredentials) => async (dispatch) => {
  try {
    dispatch(sendLoginRequest());
    const request = await axios.post(
      SERVER_URL + "/auth/signup",
      userCredentials
    );
    dispatch(loginSucccess());
    return true;
  } catch (err) {
    console.log(err);
    dispatch(loginFailure(err.message));
    return false;
  }
};

export const userLogOut = () => async (dispatch) => {
  try {
    dispatch(sendLogoutRequest());
    const request = await axios.get(SERVER_URL + '/auth/logout');
    dispatch(logoutSucccess());
    return true;
  } catch(err) {
    dispatch(logoutFailure(err.message));
    return false;
  }
};
