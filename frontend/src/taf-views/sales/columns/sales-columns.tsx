import { createColumnHelper } from "@tanstack/react-table";
import { SalesInformationInterface } from "../../../interface/sales-interface";
import { useMemo } from "react";
import { Div, Text } from "../../../components/reusable/StyledComponent";
import { format } from 'date-fns'


const salesColumnHelper = createColumnHelper<SalesInformationInterface>()

const useSalesColumn = () => {

    const salesColumn = useMemo(
        () => [
            salesColumnHelper.accessor(row => `${row.machine}`, {
                id: "Machine",
                header: () => <div className="">Machine</div>,
                cell: ({row}) => row.original.machine 
            }),
            salesColumnHelper.accessor(row => `${row.record}`, {
                id: "record",
                header: () => <div className="">New Record</div>,
                cell: ({row}) => (
                    <Div className="">
                        <Text>{row.original.record}
                            <span className="pl-1">ltr</span> 
                        </Text>
                    </Div>
                )
            }),
            salesColumnHelper.accessor(row => `${row.sold_qty}`, {
                id: "sold_qty",
                header: () => <div className="">Sold Qty</div>,
                cell: ({row}) => (
                    <Div className="">
                        <Text>{row.original.sold_qty}
                            <span className="pl-1">Ltr</span> 
                        </Text>
                    </Div>
                ) 
            }),
            salesColumnHelper.accessor(row => `${row.unit_price}`, {
                id: "unit_price",
                header: () => <div className="">Unit Price</div>,
                cell: ({row}) => (
                    <Div className="">
                        <Text>{row.original.unit_price}
                            <span className="pl-1">ETB</span> 
                        </Text>
                    </Div>
                ) 
            }),
            salesColumnHelper.accessor(row => `${row.sold_in_money}`, {
                id: "sold_in_money",
                header: () => <div className="">Sold in Money</div>,
                cell: ({row}) => (
                    <Div className="font-bold">
                        <Text>{row.original.sold_in_money}
                            <span className="pl-2">ETB</span> 
                        </Text>
                    </Div>
                )
            }),

            salesColumnHelper.accessor(row => `${row.created_at}`, {
                id: "created_at",
                header: () => <Text className="font-Rubik font-semibold">Date</Text>,
                cell: ({row}) => {
                    const created_at = row.original.created_at || new Date()
                    return(
                        <Text>{format(created_at, 'EEEE, dd, MMMM yyyy')}</Text>
                    )
                }
            }),
            

        ], []
    )


    return {
        salesColumn
    }
}


export default useSalesColumn