import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import userAuthenticationSlice from '../features/userAuthentication/userAuthenticationSlice';
import useCacheSlice from '../features/userCache/useCacheSlice';
import postsSlice from '../features/Post/postsSlice';
const logger = createLogger();

const reducers = combineReducers({
  auth: userAuthenticationSlice,
  feed: postsSlice,
  users: useCacheSlice
});

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['feed'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [logger, thunk],
});

export default store;
