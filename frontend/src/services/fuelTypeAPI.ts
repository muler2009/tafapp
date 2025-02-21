import { tafAPISlice } from "../api/apiSlice"
import { API_TAGS } from "../config/apitags"
import { FuelTypeAPIInterface, MachineAPIResponse } from "../interface/machine-interface"

const fuelTypeAPI = tafAPISlice.injectEndpoints({
    endpoints: (builder) => ({
        geFuelType: builder.query<FuelTypeAPIInterface[], void>({
            query: () => ({
                url: `taf/fuel/`,
                method: `GET`
            }),
            providesTags: [API_TAGS.FUEL_TYPE]

        }),


    })
})

export const {
    useGeFuelTypeQuery
} = fuelTypeAPI