import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_FAILURE,
  USER_LOGIN_SUCCESS,
} from './authTypes';


const initialState = {
  loading: false,
  isLoggedIn: false,
  error: ''
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        loading: true
      }
    case USER_LOGIN_SUCCESS: return{
        ...state,
        loading: false,
        isLoggedIn: true,
    }
    case USER_LOGIN_FAILURE: return{
        ...state,
        loading: false,
        isLoggedIn: false,
        error: action.payload
    }
    default: return state;
  }
};

export default authReducer;
