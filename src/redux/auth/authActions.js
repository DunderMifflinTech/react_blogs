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
    payload: error.message,
  };
};


export const userLogin = (userCredentials)=>{
    return function(dispatch){
        try{
            dispatch(sendLoginRequest());
            axios.post("http://localhost:3001/auth/login", userCredentials)
            .then((data)=>console.log(data))
        }catch(err){
            console.log(err.message);
        }
    }    
}

