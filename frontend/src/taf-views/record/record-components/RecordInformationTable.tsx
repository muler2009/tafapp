import React from 'react'
import Table from '../../../components/reusable/Table'
import { FlexBox, Text, Div } from '../../../components/reusable/StyledComponent'
import useReadingColumns from '../columns/useReadingColumns'
import { useGetAllReadingQuery } from '../../../services/readingAPI'

const RecordInformationTable = () => {
    const {data: reading, error, isSuccess} = useGetAllReadingQuery()
    const {readingColumns} = useReadingColumns()

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
              

            </Div>
        ) : (
            // Check if the data was successfully fetched and policies are available
            isSuccess && reading?.length > 0 ? (
                <Div className='reading'>
                    <Table 
                        data={reading || []}
                        columns={readingColumns}
                        showSearch={true}
                        showFilter={true}
                        filter_btn_name={`Filter Record`}
                        noRecordMessage="No associated record found" 
                       
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

export default RecordInformationTable