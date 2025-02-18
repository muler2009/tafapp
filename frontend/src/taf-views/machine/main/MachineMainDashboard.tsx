import React from 'react'
import MachineInformationTable from '../machine-mini-component/MachineInformationTable'
import MachineNavigationComponent from '../machine-mini-component/MachineNavigationComponent'
import { FlexBox, FlexBoxInner } from '../../../components/reusable/StyledComponent'

const MachineMainDashboard = () => {
  return (
    <>
        <MachineNavigationComponent />
    
    <FlexBox className={`flex h-full space-x-2`}>
        <div className='flex-grow w-[75%]'>
            <MachineInformationTable />
        </div>
            
        <FlexBoxInner className={`w-[25%] flex flex-col space-y-4 h-full`}>
            <div className='border flex justify-center items-center h-[50%]'>
                What causer
            </div>
            <div className='border flex justify-center items-center '>
                What causer
            </div>
        </FlexBoxInner>

        </FlexBox>

    </>
  )
}

export default MachineMainDashboard