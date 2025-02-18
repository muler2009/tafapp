import {createApi, fetchBaseQuery, BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../config/config';
import { API_TAGS } from '../config/apitags';
import { setAuthData, clearAuthData } from './auth'
import { RootState } from '../store/store';


interface ArgsProps {
  url: string;
  method: string;
  body?: unknown;
}

// creating a type for tag defined
type TagType = typeof API_TAGS[keyof typeof API_TAGS]
const tagTypes: TagType[] = Object.values(API_TAGS);

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers:Headers, {getState}) => {
        // headers.set('Content-Type', 'application/json')
        const token = (<RootState>getState()).auth.token
        if(token) {
            if(token) {
                headers.set('Authorization', `Bearer ${token}`)
              }
        }
        
       return headers; 
    },
})

  
const baseQueryForReauthentication: BaseQueryFn<string | FetchArgs , any, FetchBaseQueryError> = async (args, api, extraOptions) => {
    let resultFromBaseQuery = await baseQuery(args, api, extraOptions);
    const username = (<RootState>api.getState()).auth.username;
    const access = (<RootState>api.getState()).auth.token;
   
    // cheking if the token is expired
    if (resultFromBaseQuery?.error?.status === 401) {
        // send a refresh to get access token
        const refreshResult = await baseQuery(
          "iam/account/token/refresh/",
          api,
          extraOptions
        );
        if (refreshResult?.data) {
          // store the new token
          api.dispatch(setAuthData({ ...refreshResult.data, access, username }));
          // retry the original query with new access token
          resultFromBaseQuery = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(clearAuthData(access));
        }
      }
      return resultFromBaseQuery;
    
};


export const tafAPISlice = createApi({
    reducerPath: "tafAPISlice",
    baseQuery: baseQueryForReauthentication,
    tagTypes: tagTypes,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
    endpoints: (builder) => ({}),
})