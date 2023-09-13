import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import userAuthenticationSlice from '../features/userAuthentication/userAuthenticationSlice';
import useCacheSlice, { listenerMiddleware } from '../features/userCache/useCacheSlice';
import postsSlice from '../features/Post/postsSlice';
const logger = createLogger();

const reducers = combineReducers({
  auth: userAuthenticationSlice,
  feed: postsSlice,
  userCache: useCacheSlice
});

const persistConfig = {
  key: 'root',
  storage,
  //remove userCaceh from blacklist
  blacklist: ['feed', 'userCache'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: !import.meta.env.PROD,
  middleware: [logger, thunk, listenerMiddleware.middleware],
});

export default store;
