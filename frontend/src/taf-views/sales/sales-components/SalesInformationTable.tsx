import React from 'react'
import { useGetSalesInformationQuery } from '../../../services/salesAPI'
import { FlexBox, Text, Div } from '../../../components/reusable/StyledComponent'
import { Link } from 'react-router-dom'
import Table from '../../../components/reusable/Table'
import useSalesColumn from '../columns/sales-columns'

const SalesInformationTable = () => {
    const {data: sales, isSuccess, error, isLoading} = useGetSalesInformationQuery()
    const {salesColumn} = useSalesColumn()
   
  return (
    <FlexBox className='mx-1 mt-2 h-full '>   
    {
         // Check if there is an error and handle it
        error ? (
            // Check if the error is a CustomExceptionForError from your backend
            <Div className='flex flex-col items-center gap-2 mt-[12%]'>
                <Text className='flex justify-center items-center font-IBMPlexSans font-semibold text-[20px]'>
                    {(error as any)?.data?.message || "Error fetching policies!"}
                </Text>
                <p className='text-[12px] text-[#333] text-opacity-60'>you can create a new model level permission </p>
                <Link to={`create_policy`} className='pt-3'>
                    <button className='bg-blue-500 text-white px-5 rounded-[3px] text-[12px] ml-4 border ring-opacity-50 cursor-pointer'>
                        Create Policy
                    </button>
                </Link>

            </Div>
        ) : (
            // Check if the data was successfully fetched and policies are available
            isSuccess && sales?.length > 0 ? (
                <Div className='sales'>
                    <Table 
                        data={sales || []}
                        columns={salesColumn}
                       
                    />
                </Div>
            ) : (
                // Show a message when there are no policies available
                isSuccess && <p>No Sales Record available</p>
            )
        )
    }
</FlexBox>
  )
}

export default SalesInformationTable