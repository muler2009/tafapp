import { tafAPISlice } from "../api/apiSlice"
import { API_TAGS } from "../config/apitags"
import { MachineAPIResponse } from "../interface/machine-interface"

const machineAPI = tafAPISlice.injectEndpoints({
    endpoints: (builder) => ({
        getMachines: builder.query<MachineAPIResponse[], void>({
            query: () => ({
                url: `taf/machines/`,
                method: `GET`
            }),
            providesTags: [API_TAGS.MACHINE]

        }),


    })
})

export const {
    useGetMachinesQuery
} = machineAPI