import { tafAPISlice } from "../api/apiSlice";
import { API_TAGS } from "../config/apitags";
import { AuthResponse, LoginRequiredData } from "../interface/login-interface";

const loginAPI = tafAPISlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation<AuthResponse, LoginRequiredData>({
            query: (loginData) => ({
                url: `taf/login/`,
                method: `POST`,
                body: loginData
            }),
            invalidatesTags: [API_TAGS.LOGIN]
        }),


    })
})

export const {
    useLoginMutation
} = loginAPI