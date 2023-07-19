import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import userAuthenticationSlice from '../features/userAuthentication/userAuthenticationSlice';
const logger = createLogger();

const reducers = combineReducers({
  auth: userAuthenticationSlice,
});

const persistConfig = {
  key: 'root',
  storage,
//   blacklist: [''],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [logger, thunk],
});

export default store;
