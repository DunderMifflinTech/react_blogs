import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_FAILURE,
} from './authTypes';

const initialState = {
  loading: false,
  isLoggedIn: false,
  error: '',
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isLoggedIn: true,
      };
    case USER_LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        isLoggedIn: false,
        error: action.payload,
      };
    case USER_LOGOUT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case USER_LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        isLoggedIn: false,
        error: '',
      };

    case USER_LOGOUT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
