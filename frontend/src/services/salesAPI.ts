import { tafAPISlice } from "../api/apiSlice"
import { API_TAGS } from "../config/apitags"
import { SalesInformationInterface } from "../interface/sales-interface"

const salesAPI = tafAPISlice.injectEndpoints({
    endpoints: (builder) => ({
        getSalesInformation: builder.query<SalesInformationInterface[], void>({
            query: () => ({
                url: `taf/sales/`,
                method: `GET`
            }),
            providesTags: [API_TAGS.SALES]
        })
    })
})

export const {
    useGetSalesInformationQuery
} = salesAPI