import React from 'react'
import { FlexBox, Div, Text, FlexBoxInner } from '../../../components/reusable/StyledComponent'
import useUtils from '../../../hooks/useUtils'
import { Icon } from '../../../components/reusable'
import * as Icons from 'react-icons/io'
import AddNewMachineModal from '../machine-modals/AddNewMachineModal'

const MachineNavigationComponent = () => {
    const {open, handleIsOpenCloseMenuModal} = useUtils()

  return (
    <>
        <FlexBox className='m-1 py-2 px-5 border-b'>
              <FlexBoxInner className='flex justify-between items-center'>
                <Div className="">
                    <Text className="font-Poppins font-semibold text-taf-color text-[20px]">Reading Summary</Text>
                </Div>
                <Div className='flex space-x-3'>
                    <button className={`text-[13px] border font-Poppins px-3 py-2 rounded-md border-gray-200 text-[#333] hover:bg-taf-color hover:text-white disabled:bg-gray-50 disabled:text-gray-50`} 
                        onClick={handleIsOpenCloseMenuModal} disabled={open}>
                        Add-GasPump
                    </button>
                </Div>
            </FlexBoxInner>
        </FlexBox>

        <AddNewMachineModal 
            title={`Adding New Machine`}
            handleIsOpenCloseMenuModal={handleIsOpenCloseMenuModal}
            open={open}
        
        />
       
    
    </>
  )
}

export default MachineNavigationComponent