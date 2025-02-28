import { tafAPISlice } from "../api/apiSlice";
import { API_TAGS } from "../config/apitags";
import { APIInterface, AuthResponse, LoginRequiredData, LogoutArgs, ChangePasswordDataInterface } from "../interface/login-interface";



const loginAPI = tafAPISlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation<AuthResponse, LoginRequiredData>({
            query: (loginData) => ({
                url: `useraccount/login/`,
                method: `POST`,
                body: loginData
            }),
            invalidatesTags: [API_TAGS.USER]
        }),

        logoutUser: builder.mutation<any, LogoutArgs>({
            query: (logoutData) => ({
                url: `useraccount/logout/`,
                method: `POST`,
                body: logoutData
            }),
            invalidatesTags: [API_TAGS.USER]
        }),

        changePassword: builder.mutation<APIInterface, ChangePasswordDataInterface>({
            query: (changePassword) => ({
                url: `useraccount/change_password/`,
                method: `POST`,
                body: changePassword
            }),
            invalidatesTags: [API_TAGS.USER]
        })


    })
})

export const {
    useLoginMutation,
    useLogoutUserMutation,
    useChangePasswordMutation
} = loginAPI