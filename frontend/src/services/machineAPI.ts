import { tafAPISlice } from "../api/apiSlice"
import { API_TAGS } from "../config/apitags"
import { MachineAPIResponse, MachineInterface } from "../interface/machine-interface"

const machineAPI = tafAPISlice.injectEndpoints({
    endpoints: (builder) => ({
        // getting all machine instance from the backend
        getMachines: builder.query<MachineAPIResponse[], void>({
            query: () => ({
                url: `taf/machines/`,
                method: `GET`
            }),
            providesTags: [API_TAGS.MACHINE]
        }),
        // adding a new machine instance 
        addNewMachine: builder.mutation<MachineAPIResponse, MachineInterface>({
            query: (machineData) => ({
                url: `taf/machine-create/`,
                method: `POST`,
                body: machineData

            }),
            invalidatesTags: [API_TAGS.MACHINE]
        }),
        // delete machine instance 
        deleteMachineInstance: builder.mutation<MachineAPIResponse, string>({
            query: (machine_id) => ({
                url: `taf/machine-remove/${machine_id}/`,
                method: `DELETE`,
            }),
            invalidatesTags: [API_TAGS.MACHINE]
        }),




    })
})

export const {
    useGetMachinesQuery,
    useAddNewMachineMutation,
    useDeleteMachineInstanceMutation
} = machineAPI