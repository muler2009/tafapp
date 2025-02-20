import { tafAPISlice } from "../api/apiSlice";
import { API_TAGS } from "../config/apitags";
import { StockAPIInterface } from "../interface/stock-interface";


const salesAPI = tafAPISlice.injectEndpoints({
    endpoints: (builder) => ({
        getStock: builder.query<StockAPIInterface[], void>({
            query: () => ({
                url: `taf/stock/`,
                method: `GET`
            }),
            providesTags: [API_TAGS.STOCK]
        })
    })
})

export const {
    useGetStockQuery
} = salesAPI