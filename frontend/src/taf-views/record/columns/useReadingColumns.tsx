import { useMemo } from "react"
import { ColumnDef, createColumnHelper, FilterFn } from "@tanstack/react-table"
import { ReadingInterface } from "../../../interface/reading-interface"
import { Div, Text } from "../../../components/reusable/StyledComponent"
import { format } from 'date-fns'
import { FlexBox, FlexBoxInner } from "../../../components/reusable/StyledComponent"
import { BottomTooltip } from "../../../components/reusable"
import * as CiIcons from 'react-icons/ci'
import { filterByMonth } from "../utils/filterByMonth"

const readingColumnsHelper = createColumnHelper<ReadingInterface>()

const useReadingColumns = () => {

    const readingColumns = useMemo(
        () => [
            readingColumnsHelper.display({
                id: "no",
                header: () => <p>No</p>,
                cell: ({row}) => row.index + 1
            }),
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
                header: () => <Text>Date</Text>,
                cell: ({row}) => {
                    const created_at = row.original.record_date || new Date()
                    return(
                        <Text>{format(created_at, 'EEEE, dd, MMMM yyyy')}</Text>
                    )
                },
                enableColumnFilter: true,
                filterFn: filterByMonth
            }),

             readingColumnsHelper.accessor(row => `${row.record_date}`, {
                id: "record_time",
                header: () => <Text>Time</Text>,
                cell: ({row}) => {
                    const reading_updated_at = row.original.record_date || new Date()
                    return(
                        <Text>{format(reading_updated_at, 'HH:mm aaaa')}</Text>
                    )
                }
            }),
            readingColumnsHelper.display({
                id: "Action",
                header: () => <span></span>,
                cell: ({row}) => {
                    return(
                        <FlexBox className="flex justify-end items-center pr-20 invisible group-hover:visible py-1">
                            <BottomTooltip content={`Rename`}>
                                <FlexBoxInner className="w-9 h-9 flex justify-center items-center hover:bg-gray-200 rounded-full" onClick={() => alert(`${row.original.record_date} Edit Clicked`)}>
                                    <CiIcons.CiEdit size={17} />
                                </FlexBoxInner>
                            </BottomTooltip>
                            <BottomTooltip content={`Delete`}>
                                <FlexBoxInner className="w-9 h-9 flex justify-center items-center hover:bg-gray-200 rounded-full" onClick={() => alert(`${row.original.record_date} Delete Clicked`)}>
                                    <CiIcons.CiTrash size={17} />
                                </FlexBoxInner>
                            </BottomTooltip>
                         
                        </FlexBox>
                    )
                }
            }),
            


        ], []
    )

  return { readingColumns }
}

export default useReadingColumns