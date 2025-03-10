import React from 'react'
import { FlexBox, FlexBoxInner, Div, Text } from '../../../components/reusable/StyledComponent'
import * as FaIcons from 'react-icons/fa'
import SalesFilterComponent from './SalesFilterComponent'
import SalesFilterDatePicker from './SalesFilterDatePicker'

const SalesNavigation = () => {
  return (
    <FlexBox className='m-1 py-2 px-5 border-b'>
      <FlexBoxInner className='flex justify-between items-center'>
        <Div className="">
          <Text className="flex items-center space-x-3 font-Poppins font-semibold text-primary-green text-[20px]">
            <FaIcons.FaBraille /> <span>Sales Summary</span> 
          </Text>
        </Div>
        <Div className='flex space-x-2'>
          <SalesFilterDatePicker />
        </Div>
      
      </FlexBoxInner>
    </FlexBox>
  )
}

export default SalesNavigation