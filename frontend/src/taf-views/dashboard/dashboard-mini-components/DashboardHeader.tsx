import React from 'react'
import { FlexBox, FlexBoxInner, Div, Text } from '../../../components/reusable/StyledComponent'
import {format} from "date-fns"
import { useSelector } from 'react-redux'
// import { username } from '../../../api/auth'

const DashboardHeader = () => {
    // const username2 = useSelector(username)
    const today = new Date()
  return (
    <FlexBox className='bg-[#f9fafb] w-full'>
        <FlexBoxInner className='flex justify-between items-center px-5 py-3 border-b '>
          <Text className='text-black text-[18px] font-Rubik font-semibold'>Overview</Text>
          <Div className='flex space-x-3 justify-start items-center font-Poppins'>
            <button className='border bg-gray-50 rounded-md text-[12px] text-[#333] hover:text-white hover:bg-taf-color px-5 py-1'>Customized Widget</button>
            <button className='border bg-gray-50 rounded-md'>Filter</button>

          </Div>


        </FlexBoxInner>
    </FlexBox>
  )
}

export default DashboardHeader