import { configureStore } from "@reduxjs/toolkit";
import {createLogger} from 'redux-logger'
import userAuthenticationSlice from "../features/userAuthentication/userAuthenticationSlice";
const logger = createLogger();

const store = configureStore({
    reducer: {
        auth: userAuthenticationSlice
    }, 
    middleware: (getDefaultMiddleware)=> getDefaultMiddleware().concat(logger)
});

export default store;