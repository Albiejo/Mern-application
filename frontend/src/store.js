import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice.js'
import AdminAuthReducer from './slices/AdminAuthSlice.js';
import {apiSlice}  from './slices/apiSlice.js'



const store = configureStore({
    reducer: {
        auth: authReducer, //first slice 
        adminauth:AdminAuthReducer,  //second slice 
        [apiSlice.reducerPath]: apiSlice.reducer //third slice 
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),//we are extending the default middleware with our custom middleware using concat
    devTools: true,
  });
  
  export default store;