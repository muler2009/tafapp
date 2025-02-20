import { useMemo } from "react"
import { createColumnHelper } from "@tanstack/react-table"
import { ReadingInterface } from "../../../interface/reading-interface"
import { Div, Text } from "../../../components/reusable/StyledComponent"
import { format } from 'date-fns'

const readingColumnsHelper = createColumnHelper<ReadingInterface>()



const useReadingColumns = () => {

    const readingColumns = useMemo(
        () => [
            readingColumnsHelper.accessor(row => `${row.machine}`, {
                id: "machine",
                header: () => <Div className="">Machine</Div>,
                cell: ({row}) => row.original.machine 
            }),

             readingColumnsHelper.accessor(row => `${row.new_record}`, {
                id: "new_record",
                header: () => <Div className="">New Reading</Div>,
                cell: ({row}) => (
                    <Div className="font-bold">
                        <Text>{row.original.new_record}
                            <span className="pl-1">Ltr</span> 
                        </Text>
                    </Div>
                ) 
            }),
            readingColumnsHelper.accessor(row => `${row.previous_record}`, {
                id: "previous_record",
                header: () => <Div className="">Previous Reading</Div>,
                cell: ({row}) => (
                    <Div className="font-bold">
                        <Text>{row.original.previous_record}
                            <span className="pl-1">Ltr</span> 
                        </Text>
                    </Div>
                ) 
            }),


             readingColumnsHelper.accessor(row => `${row.record_date}`, {
                id: "record_date",
                header: () => <Text className="font-Rubik font-semibold">Reading Date</Text>,
                cell: ({row}) => {
                    const created_at = row.original.record_date || new Date()
                    return(
                        <Text>{format(created_at, 'EEEE, dd, MMMM yyyy')}</Text>
                    )
                }
            }),

             readingColumnsHelper.accessor(row => `${row.record_date}`, {
                id: "record_date",
                header: () => <Text className="font-Rubik font-semibold">Reading Time</Text>,
                cell: ({row}) => {
                    const reading_updated_at = row.original.record_date || new Date()
                    return(
                        <Text>{format(reading_updated_at, 'HH:mm aaaa')}</Text>
                    )
                }
            }),
            readingColumnsHelper.display({
                id: "Actions",
                header: () => <span></span>,
                cell: ({row}) => {
                    return(
                        <div className="flex space-x-3">
                            <button className="bg-blue-600 px-2">Update</button>

                        </div>
                    )
                }
            }),
            


        ], []
    )

  return { readingColumns }
}

export default useReadingColumns