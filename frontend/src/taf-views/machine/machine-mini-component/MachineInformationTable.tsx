import React from 'react'
import { FlexBox, Text, Div } from '../../../components/reusable/StyledComponent'
import { Link } from 'react-router-dom'
import Table from '../../../components/reusable/Table'
import { useGetMachinesQuery } from '../../../services/machineAPI'
import useMachineColumn from '../columns/useMachineColumn'
import useAuditUtils from '../../../hooks/useAuditUtils'
import { FaGasPump } from "react-icons/fa6";


const MachineInformationTable = () => {
    const {data: taf_machine, isSuccess, error, isLoading} = useGetMachinesQuery()
    const {machineColumn} = useMachineColumn()
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
                <p className='text-[12px] text-[#333] text-opacity-60'>you can create a new model level permission </p>
            </Div>
        ) : isSuccess ? ( 
                isArrayOfType(taf_machine) && taf_machine.length > 0 ? (
                    <Table
                        data={taf_machine}
                        columns={machineColumn}
                        showEntries={true}
                        showSearch={true}
                        showPagination={true}
                        tableStyle='machine'
                    />
                ) : (
                    <div className="flex flex-col justify-center space-x-2">
                        <Table
                            data={[]}
                            columns={machineColumn}
                            showEntries={true}
                            showSearch={true}
                            showPagination={true}
                            tableStyle='machine'
                        />
                        <div className={`flex flex-col items-center justify-center py-5 h-[30vh] `}>
                            <div className='flex items-center relative text-taf-color text-opacity-50'>
                                <FaGasPump  size={100} />
                            </div>
                            <div className={`flex flex-col justify-center items-center py-2 font-Poppins`}>
                                <p className="text-[20px] font-semibold text-black text-opacity-70 ">Machine is {(taf_machine as any).message || ""}</p>
                                <p className="text-[14px] text-[#333] text-opacity-65 py-2">{(taf_machine as any).detail || ""}</p>
                            </div>
                        </div>
                    </div>
                )
        ) : null   
    }  
</div>
)      
}

export default MachineInformationTable;