import { useMemo } from "react"
import { createColumnHelper } from "@tanstack/react-table"
import { StockInterface } from "../../../interface/stock-interface"
import { Div, Text } from "../../../components/reusable/StyledComponent"
import { format } from 'date-fns'


const stockColumnHelper = createColumnHelper<StockInterface>()


export const useStockColumns = () => {

    const stockColumn = useMemo(
        () => [
            stockColumnHelper.display({
                id: "no",
                header: () => <p>No</p>,
                cell: ({row}) => row.index + 1
            }),
            stockColumnHelper.accessor(row => `${row.nedaj_type}`, {
                id: "nedaj_type",
                header: () => <Div className="">Fuel type</Div>,
                cell: ({row}) => row.original.nedaj_type 
            }),
            stockColumnHelper.accessor(row => `${row.total_liters}`, {
                id: "total_liters",
                header: () => <Div className="">Total Liter</Div>,
                cell: ({row}) => (
                    <Div className="font-bold">
                        <Text>{row.original.total_liters}
                            <span className="pl-1">Ltr</span> 
                        </Text>
                    </Div>
                ) 
            }),
            stockColumnHelper.accessor(row => `${row.remaining}`, {
                id: "remaining",
                header: () => <Div className="">Remaining Fuel</Div>,
                cell: ({row}) => (
                    <Div className="font-bold">
                        <Text>{row.original.remaining}
                            <span className="pl-1">Ltr</span> 
                        </Text>
                    </Div>
                ) 
            }),
            stockColumnHelper.accessor(row => `${row.unit_price}`, {
                id: "unit_price",
                header: () => <Div className="">Unit Price</Div>,
                cell: ({row}) => (
                    <Div className="font-bold">
                        <Text>{row.original.unit_price}
                            <span className="pl-1">ETB</span> 
                        </Text>
                    </Div>
                ) 
            }),
            stockColumnHelper.accessor(row => `${row.prev_qty}`, {
                id: "prev_qty",
                header: () => <Div className="">Previous Reading</Div>,
                cell: ({row}) => (
                    <Div className="font-bold">
                        <Text>{row.original.prev_qty}
                            <span className="pl-1">Ltr</span> 
                        </Text>
                    </Div>
                ) 
            }),
            stockColumnHelper.accessor(row => `${row.sold_qty}`, {
                id: "sold_qty",
                header: () => <Div className="">Sold Quantity</Div>,
                cell: ({row}) => (
                    <Div className="font-bold">
                        <Text>{row.original.sold_qty}
                            <span className="pl-1">Ltr</span> 
                        </Text>
                    </Div>
                ) 
            }),
          

            stockColumnHelper.accessor(row => `${row.stocked_date}`, {
                id: "stocked_date",
                header: () => <Text className="font-Rubik font-semibold">Stocked Date</Text>,
                cell: ({row}) => {
                    const created_at = row.original.stocked_date || new Date()
                    return(
                        <Text>{format(created_at, 'EEEE, dd, MMMM yyyy')}</Text>
                    )
                }
            }),
                        
         
        ], []
    )

  return { stockColumn }
}

export default useStockColumns
