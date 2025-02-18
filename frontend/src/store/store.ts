import { configureStore } from "@reduxjs/toolkit";
import { tafAPISlice } from "../api/apiSlice";
import authReducers from '../api/auth'
// import dmsAPISlice from "../dms/services/dmsAPISlice";


const store = configureStore({
    reducer: {
        [tafAPISlice.reducerPath]: tafAPISlice.reducer,
        auth: authReducers,
        // [dmsAPISlice.reducerPath]: dmsAPISlice.reducer
    },

    // The default Middleware configured
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({}).concat([
      tafAPISlice.middleware, 
      // dmsAPISlice.middleware
    ]),
  
  // devTools: process.env.NODE_ENV !== 'production',
  devTools: true
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export default store;