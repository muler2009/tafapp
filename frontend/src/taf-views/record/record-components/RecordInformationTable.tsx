import React from 'react'
import Table from '../../../components/reusable/Table'
import { FlexBox, Text, Div } from '../../../components/reusable/StyledComponent'
import useReadingColumns from '../columns/useReadingColumns'
import { useGetAllReadingQuery } from '../../../services/readingAPI'
import useAuditUtils from '../../../hooks/useAuditUtils'
import { FaRegFolderOpen } from "react-icons/fa6";
import { AiFillRead } from "react-icons/ai";

const RecordInformationTable = () => {
    const {data: reading, error, isSuccess} = useGetAllReadingQuery()
    const {readingColumns} = useReadingColumns()
    const { isArrayOfType } = useAuditUtils()

    console.log(reading)   

  return (
    <div className='mx-1 mt-2 h-full '>   
    {
         // Check if there is an error and handle it
        error ? (
            // Check if the error is a CustomExceptionForError from your backend
            <div className='flex flex-col items-center gap-2 mt-[12%]'>
              <Text className='flex justify-center items-center font-IBMPlexSans font-semibold text-[20px]'>
                  {(error as any)?.data?.message || "Error fetching policies!"}
              </Text>
              <p className='text-[12px] text-[#333] text-opacity-60'>you can create a new model level permission </p>
            </div>
        ) : isSuccess ? (
            isArrayOfType(reading) && reading.length > 0 ? (
              <Table
                data={reading}
                columns={readingColumns}
                showEntries={true}
                showSearch={true}
                showPagination={true}
                tableStyle={`reading`}
                showFilter={true}
              />
            ) : (
              <div className="flex flex-col justify-center space-x-2">
                <Table
                  data={[]}
                  columns={readingColumns}
                  showEntries={true}
                  showSearch={true}
                  showPagination={true}
                  tableStyle={`reading`}
                />
                <div className={`flex flex-col items-center justify-center py-5 h-[30vh] `}>
                    <div className='flex items-center relative text-taf-color text-opacity-50'>
                        <AiFillRead  size={100} />
                    </div>
                    <div className={`flex flex-col justify-center items-center py-2 font-Poppins`}>
                        <p className="text-[20px] font-semibold text-black text-opacity-70 ">Reading is {(reading as any).message || ""}</p>
                        <p className="text-[14px] text-gray-600 py-2">{(reading as any).detail || ""}</p>
                    </div>
                </div>
              </div>
            )
          ) : null
          
    }
        
      </div>
        )      
    
  }

export default RecordInformationTable