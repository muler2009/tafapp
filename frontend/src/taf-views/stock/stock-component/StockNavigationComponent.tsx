import React from 'react'
import { FlexBox, Div, Text, FlexBoxInner } from '../../../components/reusable/StyledComponent'
import useUtils from '../../../hooks/useUtils'
// import NewRecordModal from '../record-modals/NewRecordModal'

const StockNavigationComponent = () => {
    const {open, handleIsOpenCloseMenuModal} = useUtils()

  return (
    <>
        <FlexBox className='m-1 py-2 px-5 border-b'>
            <FlexBoxInner className='flex justify-between items-center'>
                <Div className="">
                    <Text className="font-Poppins font-semibold text-taf-color text-[20px]">Fuel Stock Summary</Text>
                </Div>
                <Div className=''>
                    <button 
                        className={`text-[13px] text-white font-Poppins px-3 py-2 rounded-md bg-taf-color disabled:bg-gray-50 disabled:text-gray-50`} 
                        onClick={handleIsOpenCloseMenuModal} 
                        disabled={open}
                    >
                        Add-to-Stock
                    </button>
                </Div>
            </FlexBoxInner>
        </FlexBox>

        {/* <NewRecordModal 
            open={open} 
            handleIsOpenCloseMenuModal={handleIsOpenCloseMenuModal} 
            title={`New Record`} 
        /> */}
    
    </>
  )
}

export default StockNavigationComponent