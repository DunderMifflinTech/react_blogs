import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import userAuthenticationSlice from '../features/userAuthentication/userAuthenticationSlice';
import useCacheSlice, { listenerMiddleware } from '../features/userCache/useCacheSlice';
import postsSlice from '../features/Post/postsSlice';
import visitingUserSlice from '../features/VisitingUser/visitingUser';
const logger = createLogger();

const reducers = combineReducers({
  auth: userAuthenticationSlice,
  feed: postsSlice,
  userCache: useCacheSlice,
  visitingUser: visitingUserSlice,
});

const persistConfig = {
  key: 'root',
  storage,
  //remove userCache from blacklist
  blacklist: ['feed', 'visitingUser'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: !import.meta.env.PROD,
  middleware: [logger, thunk, listenerMiddleware.middleware],
});

export default store;
