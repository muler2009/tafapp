import { createColumnHelper } from "@tanstack/react-table";
import { SalesInformationInterface } from "../../../interface/sales-interface";
import { useMemo } from "react";
import { Div, FlexBox, P, Text, FlexBoxInner } from "../../../components/reusable/StyledComponent";
import { format } from 'date-fns'
import * as BiIcons from 'react-icons/bi'
import * as CiIcons from 'react-icons/ci'
import { BottomTooltip } from "../../../components/reusable";


const salesColumnHelper = createColumnHelper<SalesInformationInterface>()

const useSalesColumn = () => {

    const salesColumn = useMemo(
        () => [
            salesColumnHelper.accessor(row => `${row.machine}`, {
                id: "Machine",
                header: () => <div className="">Machine</div>,
                cell: ({row}) => row.original.machine ,
                footer: 'Total',
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
                ),
                footer: ({ table }) => {
                    // Calculate the total of the sol_in_mony column
                    const total = table
                      .getFilteredRowModel()
                      .rows.reduce((sum, row) => sum + Number(row.original.sold_qty), 0);
              
                    return `$${total}`; // Display the total in the footer
                  }, 
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
                    <Div className="font-bold text-taf-color">
                        <Text>{row.original.sold_in_money}
                            <span className="pl-2">ETB</span> 
                        </Text>
                    </Div>
                ),
                footer: ({ table }) => {
                    // Calculate the total of the sol_in_mony column
                    const total = table
                      .getFilteredRowModel()
                      .rows.reduce((sum, row) => sum + Number(row.original.sold_in_money), 0);
              
                    return `$${total}`; // Display the total in the footer
                  },
            }),

            salesColumnHelper.accessor(row => `${row.created_at}`, {
                id: "created_at",
                header: () => <Text className="font-Rubik font-semibold">Date</Text>,
                cell: ({row}) => {
                    const created_at = row.original.created_at || new Date()
                    return(
                        <Text>{format(created_at, 'dd, MMMM yyyy')}</Text>
                    )
                }
            }),

            salesColumnHelper.display({
                id: "sales_actions",
                header: () => <P className="">Sales Actions</P>,
                cell: ({row}) => {
                    return(
                        <FlexBox className="flex justify-end items-center pr-20 invisible group-hover:visible py-1">
                            <BottomTooltip content={`Rename`}>
                                <FlexBoxInner className="w-9 h-9 flex justify-center items-center hover:bg-gray-200 rounded-full" onClick={() => alert(`${row.original.sales_id} Edit Clicked`)}>
                                    <CiIcons.CiDesktop size={17} />
                                </FlexBoxInner>
                            </BottomTooltip>
                            <BottomTooltip content={`Delete`}>
                                <FlexBoxInner className="w-9 h-9 flex justify-center items-center hover:bg-gray-200 rounded-full" onClick={() => alert(`${row.original.sales_id} Delete Clicked`)}>
                                    <CiIcons.CiPhone size={17} />
                                </FlexBoxInner>
                            </BottomTooltip>
                            <BottomTooltip content={`Downlaod`}>
                                <FlexBoxInner className="w-9 h-9 flex justify-center items-center hover:bg-gray-200 rounded-full" onClick={() => alert(`${row.original.sales_id} Delete Clicked`)}>
                                    <CiIcons.CiSaveDown2 size={17} />
                                </FlexBoxInner>
                            </BottomTooltip>
                        </FlexBox>
                    )
                }
            })
            
        ], []
    )


    return {
        salesColumn
    }
}


export default useSalesColumn