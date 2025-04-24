import { tafAPISlice } from "../api/apiSlice";
import { API_TAGS } from "../config/apitags";
import { ReadingAPIInterface, ReadingAPIResponseInterfce, ReadingInterface } from "../interface/reading-interface";



const salesAPI = tafAPISlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllReading: builder.query<ReadingAPIResponseInterfce, void>({
            query: () => ({
                url: `taf/reading/`,
                method: `GET`
            }),
            providesTags: [API_TAGS.READING]
        }),
        addNewReading: builder.mutation<ReadingAPIInterface, ReadingInterface>({
            query: (readingData) => ({
                url: `taf/new_reading/`,
                method: `POST`,
                body: readingData
            }),
            invalidatesTags: [API_TAGS.READING]
        })
    })
})

export const {
    useGetAllReadingQuery,
    useAddNewReadingMutation
} = salesAPI