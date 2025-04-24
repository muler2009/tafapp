import React from 'react'
import { useGetSalesInformationQuery } from '../../../services/salesAPI'
import { FlexBox, Text, Div } from '../../../components/reusable/StyledComponent'
import { Link } from 'react-router-dom'
import Table from '../../../components/reusable/Table'
import useSalesColumn from '../columns/sales-columns'
import useAuditUtils from '../../../hooks/useAuditUtils'
import { FaRegFolderOpen } from "react-icons/fa6";


const SalesInformationTable = () => {
    const {data: sales, isSuccess, error, isLoading} = useGetSalesInformationQuery()
    const {salesColumn} = useSalesColumn()
    const {isArrayOfType} = useAuditUtils()

   
  return (
        <div className='mx-1 mt-2 h-full'>   
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
                    isArrayOfType(sales) && sales.length > 0 ? (
                    <Table
                        data={sales}
                        columns={salesColumn}
                        showEntries={true}
                        showSearch={true}
                        showPagination={true}
                    />
                    ) : (
                    <div className="flex flex-col justify-center space-x-2">
                        <Table
                            data={[]}
                            columns={salesColumn}
                            showEntries={true}
                            showSearch={true}
                            showPagination={true}
                            tableStyle={`reading`}
                        />
                        <div className={`flex flex-col items-center justify-center py-5 h-[30vh] `}>
                            <div className='flex items-center relative text-taf-color text-opacity-50'>
                                <FaRegFolderOpen  size={100} />
                            </div>
                            <div className={`flex flex-col justify-center items-center py-2 font-Poppins`}>
                                <p className="text-[20px] font-semibold text-black text-opacity-70 ">Sales is {(sales as any).message || ""}</p>
                                <p className="text-[14px] text-gray-600 py-2">{(sales as any).detail || ""}</p>
                            </div>
                        </div>
                    </div>
                    )
                ) : null   
            }  
        </div>
    )      
  }


export default SalesInformationTable