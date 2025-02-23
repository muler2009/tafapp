import React from 'react'
import { FlexBox, Div, Text, FlexBoxInner } from '../../../components/reusable/StyledComponent'
import useUtils from '../../../hooks/useUtils'
import NewRecordModal from '../record-modals/NewRecordModal'

const RecordNavigationComponent = () => {
    const {open, handleIsOpenCloseMenuModal} = useUtils()

  return (
    <>
        <FlexBox className='m-1 py-2 px-5 border-b'>
            <FlexBoxInner className='flex justify-between items-center'>
                <Div className="">
                    <Text className="font-Poppins font-semibold text-taf-color text-[20px]">Reading Summary</Text>
                </Div>
                <Div className='flex space-x-3'>
                    <button 
                        className={`text-[13px] text-white font-Poppins px-3 py-2 rounded-md bg-taf-color disabled:bg-gray-50 disabled:text-gray-50`} 
                        onClick={handleIsOpenCloseMenuModal} 
                        disabled={open}
                    >
                        Add Reading
                    </button>

                   
                </Div>

                {/* <FuleTypeSummary /> */}
                
            </FlexBoxInner>
        </FlexBox>

        <NewRecordModal 
            open={open} 
            handleIsOpenCloseMenuModal={handleIsOpenCloseMenuModal} 
            title={`New Reading`} 
        />
    
    </>
  )
}

export default RecordNavigationComponent