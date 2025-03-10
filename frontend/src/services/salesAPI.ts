import { tafAPISlice } from "../api/apiSlice"
import { API_TAGS } from "../config/apitags"
import { SalesAPIResponse } from "../interface/sales-interface"

const salesAPI = tafAPISlice.injectEndpoints({
    endpoints: (builder) => ({
        getSalesInformation: builder.query<SalesAPIResponse[], void>({
            query: () => ({
                url: `taf/sales/`,
                method: `GET`
            }),
            providesTags: [API_TAGS.SALES]
        }),
        
        monthlySalesInformation: builder.query<SalesAPIResponse[], { month: number; year: number }>({
            query: ({ month, year }) => ({
              url: `taf/monthly/`,
              method: 'GET',
              params: { month, year }, // Correctly passing month and year as query parameters
            }),
            providesTags: [API_TAGS.SALES],
          }),

          

        dailySalesInformation: builder.query<SalesAPIResponse[], void>({
            query: () => ({
                url: `taf/daily/`,
                method: `GET`
            }),
            providesTags: [API_TAGS.SALES]
        }),


    })
})

export const {
    useGetSalesInformationQuery,
    useDailySalesInformationQuery,
    useMonthlySalesInformationQuery
} = salesAPI