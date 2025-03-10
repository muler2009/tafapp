import { createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";
import { Div, Text } from "../../../components/reusable/StyledComponent";
import { format } from 'date-fns'
import { MachineAPIResponse } from "../../../interface/machine-interface";
import MachineActionCell from "../machine-modals/MachineActionCell";


const machineColumnHelper = createColumnHelper<MachineAPIResponse>()

const useMachineColumn = () => {

    const machineColumn = useMemo(
        () => [
            machineColumnHelper.display({
                id: "machine",
                header: () => <Text className="text-[14px]">Machine</Text>,
                cell: ({row}) => {
                    return(
                        <Div>{row.original.machine_name}-{row.original.machine_code}</Div>
                    )
                }
            }),
            machineColumnHelper.accessor(row => `${row.nedaj_type}`, {
                id: "fuel_type",
                header: () => <Text className="text-[14px]">Fuel Type</Text>,
                cell: ({row}) => (
                    <Div className="font-bold">
                        <Text>{row.original.nedaj_type}</Text>
                    </Div>
                )
            }),

            machineColumnHelper.accessor(row => `${row.registration_date}`, {
                id: "created_at",
                header: () => <Text className="text-[14px]">Registered-Date</Text>,
                cell: ({row}) => {
                    const created_at = row.original.registration_date || new Date()
                    return(
                        <Text>{format(created_at, 'EEEE, dd, MMMM yyyy')}</Text>
                    )
                }
            }),

            machineColumnHelper.display({
                id: "actions",
                header: () => <span className={`text-[#333]`}>Action</span>,
                cell: ({row}) => {
                    const rowData = row.original
                    return(
                        <MachineActionCell 
                            rowData={rowData}
                        />
                    )
                }
            })
        ], []
    )

    return { machineColumn }
}


export default useMachineColumn 