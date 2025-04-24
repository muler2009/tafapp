import React from 'react'
import { FlexBox, Div, Text } from '../../../components/reusable/StyledComponent'
import { Link } from 'react-router-dom'
import Table from '../../../components/reusable/Table'
import useStockColumns from '../columns/useStockColumns'
import { useGetStockQuery } from '../../../services/stockAPI'
import useAuditUtils from '../../../hooks/useAuditUtils'
import { RiStockFill } from "react-icons/ri";


const StockDataInformationTable = () => {

    const {data: stock, isSuccess, error} = useGetStockQuery()
    const {stockColumn } = useStockColumns()
    const {isArrayOfType} = useAuditUtils()

  return (
    <div className='mx-1 mt-2 h-full '>   
    {
         // Check if there is an error and handle it
        error ? (
            // Check if the error is a CustomExceptionForError from your backend
            <Div className='flex flex-col items-center gap-2 mt-[12%]'>
                <Text className='flex justify-center items-center font-IBMPlexSans font-semibold text-[20px]'>
                    {(error as any)?.data?.message || "Error fetching policies!"}
                </Text>
            </Div>
        ) : isSuccess ? ( 
                        isArrayOfType(stock) && stock.length > 0 ? (
                            <Table
                                data={stock}
                                columns={stockColumn}
                                showEntries={true}
                                showSearch={true}
                                showPagination={true}
                                tableStyle='machine'
                            />
                        ) : (
                            <div className="flex flex-col justify-center space-x-2">
                                <Table
                                    data={[]}
                                    columns={stockColumn}
                                    showEntries={true}
                                    showSearch={true}
                                    showPagination={true}
                                    tableStyle='machine'
                                />
                                <div className={`flex flex-col items-center justify-center py-5 h-[30vh] `}>
                                    <div className='flex items-center relative text-taf-color text-opacity-50'>
                                        <RiStockFill  size={100} />
                                    </div>
                                    <div className={`flex flex-col justify-center items-center py-2 font-Poppins`}>
                                        <p className="text-[20px] font-semibold text-black text-opacity-70">{(stock as any).message || ""}</p>
                                        <p className="text-[14px] text-[#333] py-2">{(stock as any).detail || ""}</p>
                                    </div>
                                </div>
                            </div>
                        )
                ) : null   
            }  
        </div>
        )      
        }

export default StockDataInformationTable