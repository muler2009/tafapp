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
                id: "no",
                header: () => <p>No</p>,
                cell: ({row}) => row.index + 1
            }),
            machineColumnHelper.display({
                id: "machine",
                header: () => <span>Name</span>,
                cell: ({row}) => {
                    return(
                        <Div>{row.original.machine_name}</Div>
                    )
                }
            }),
            machineColumnHelper.display({
                id: "machine_code",
                header: () => <span>Machine Code</span>,
                cell: ({row}) => {
                    return(
                        <Div>{row.original.machine_code}</Div>
                    )
                }
            }),
            machineColumnHelper.accessor(row => `${row.nedaj_type}`, {
                id: "fuel_type",
                header: () => <span>Fuel type</span>,
                cell: ({row}) => (
                    <Div className="font-bold">
                        <Text>{row.original.nedaj_type}</Text>
                    </Div>
                )
            }),

            machineColumnHelper.accessor(row => `${row.registration_date}`, {
                id: "created_at",
                header: () => <span>Registered-Date</span>,
                cell: ({row}) => {
                    const created_at = row.original.registration_date || new Date()
                    return(
                        <Text>{format(created_at, 'EEEE, dd, MMMM yyyy')}</Text>
                    )
                }
            }),
            machineColumnHelper.accessor(row => `${row.registration_date}`, {
                id: "created_time",
                header: () => <span>Registered time</span>,
                cell: ({row}) => {
                    const created_at = row.original.registration_date || new Date()
                    return(
                        <Text>{format(created_at, 'hh:mm a')}</Text>
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