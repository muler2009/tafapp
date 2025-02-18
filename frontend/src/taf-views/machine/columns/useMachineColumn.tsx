import { createColumnHelper } from "@tanstack/react-table";
import { SalesInformationInterface } from "../../../interface/sales-interface";
import { useMemo } from "react";
import { Div, Text } from "../../../components/reusable/StyledComponent";
import { format } from 'date-fns'
import { MachineAPIResponse } from "../../../interface/machine-interface";


const machineColumnHelper = createColumnHelper<MachineAPIResponse>()

const useMachineColumn = () => {

    const machineColumn = useMemo(
        () => [
            machineColumnHelper.display({
                id: "machine",
                header: () => <Text className="font-Rubik text-gray-50 text-opacity-70 font-semibold text-[14px]">Machine</Text>,
                cell: ({row}) => {
                    return(
                        <Div>{row.original.machine_name}-{row.original.machine_code}</Div>
                    )
                }
            }),
            machineColumnHelper.accessor(row => `${row.nedaj_type}`, {
                id: "fuel_type",
                header: () => <Text className="font-Rubik text-gray-50 text-opacity-70 font-semibold text-[14px]">Fuel Type</Text>,
                cell: ({row}) => (
                    <Div className="font-bold">
                        <Text>{row.original.nedaj_type}</Text>
                    </Div>
                )
            }),

            machineColumnHelper.accessor(row => `${row.registration_date}`, {
                id: "created_at",
                header: () => <Text className="font-Rubik text-gray-50 text-opacity-70 font-semibold text-[14px]">Registered-Date</Text>,
                cell: ({row}) => {
                    const created_at = row.original.registration_date || new Date()
                    return(
                        <Text>{format(created_at, 'EEEE, dd, MMMM yyyy')}</Text>
                    )
                }
            }),
        ], []
    )

    return { machineColumn }
}


export default useMachineColumn