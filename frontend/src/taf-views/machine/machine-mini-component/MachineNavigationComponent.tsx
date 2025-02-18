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
            <FlexBoxInner className='flex flex-col gap-2'>
                <Div className="">
                    <Text className="font-Poppins font-semibold text-taf-color text-[20px]">Available Machine</Text>
                </Div>
                <Div className=' pt-3'>
                    <button className='font-Poppins text-[12px] hover:bg-taf-color hover:text-white px-3 py-2 rounded-md bg-gray-100 flex items-center '
                        onClick={handleIsOpenCloseMenuModal} 
                        disabled={open} >
                        <Icons.IoMdAdd />
                        <span className='pl-1'>Add-New-Machine</span>
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