import { tafAPISlice } from "../api/apiSlice";
import { API_TAGS } from "../config/apitags";
import { StockAPIInterface, StockInterface } from "../interface/stock-interface";


const salesAPI = tafAPISlice.injectEndpoints({
    endpoints: (builder) => ({
        getStock: builder.query<StockAPIInterface[], void>({
            query: () => ({
                url: `taf/stock/`,
                method: `GET`
            }),
            providesTags: [API_TAGS.STOCK]
        }),
        addStock: builder.mutation<StockAPIInterface, StockInterface>({
            query: (stockData) => ({
                url: `taf/add_to_stock/`,
                method: `POST`,
                body: stockData
            }),
            invalidatesTags: [API_TAGS.STOCK]
        })
    })
})

export const {
    useGetStockQuery,
    useAddStockMutation
} = salesAPI